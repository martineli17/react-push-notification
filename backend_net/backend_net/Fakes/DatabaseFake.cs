using backend_net.Dtos;

namespace backend_net.Fakes
{
    public static class DatabaseFake
    {
        public static List<SubscriptionDto> _subscriptions = new();

        public static void AddSubscription(string key, SubscriptionAddDto subscription)
        {
            _subscriptions.RemoveAll(x => x.key == key);
            _subscriptions.Add(new() { key = key, Subscription = subscription });
        }
        public static IReadOnlyList<SubscriptionDto> GetAll() => _subscriptions;
        public static SubscriptionDto? GetByKey(string key) => _subscriptions.FirstOrDefault(x => x.key == key);
    }
}
