namespace backend_net.Dtos
{
    public struct SubscriptionAddDto
    {
        public string Endpoint { get; init; }
        public Key keys { get; init; }
        public struct Key
        {
            public string Auth { get; init; }
            public string P256dh { get; init; }
        }
    }
}
