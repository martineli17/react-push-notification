using backend_net.Dtos;
using backend_net.Fakes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WebPush;

namespace backend_net.Controllers
{
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly WebPushClient _webPushClient;
        public NotificationController(IConfiguration configuration)
        {
            var publicKey = configuration.GetValue<string>("PUSH_NOTIFICATION_PUBLIC_KEY");
            var privateKey = configuration.GetValue<string>("PUSH_NOTIFICATION_PRIVATE_KEY");

            _webPushClient = new();
            _webPushClient.SetVapidDetails(new("http://localhost:3002", publicKey, privateKey));
        }

        [HttpPost("subscriber/{key}")]
        public ActionResult Subscriber([FromRoute]  string key, [FromBody] SubscriptionAddDto subscription)
        {
            DatabaseFake.AddSubscription(key, subscription);
            return StatusCode(201);
        }

        [HttpGet("keys")]
        public ActionResult GetAllKeys()
        {
            return StatusCode(200, DatabaseFake.GetAll());
        }

        [HttpPost("push/{key}")]
        public ActionResult Push([FromRoute] string key, [FromBody] PublishMessageDto message)
        {
            var subscription = DatabaseFake.GetByKey(key);

            if (!subscription.HasValue)
                return StatusCode(404, new { Message = "Subscription not found" });

            var subscriptionRequest = new PushSubscription
            {
                Auth = subscription.Value.Subscription.keys.Auth,
                Endpoint = subscription.Value.Subscription.Endpoint,
                P256DH = subscription.Value.Subscription.keys.P256dh,
            };
            var notificationMessage = JsonConvert.SerializeObject(message, new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
            });

            _webPushClient.SendNotification(subscriptionRequest, notificationMessage);
            return StatusCode(200);
        }
    }
}
