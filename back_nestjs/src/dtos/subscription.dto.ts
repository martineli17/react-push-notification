/* eslint-disable prettier/prettier */
export interface SubscriptionDto {
    key: string;
    endpoint: string;
    keys: {
        auth: string;
        p256dh: string;
    }
}
