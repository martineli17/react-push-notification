/* eslint-disable prettier/prettier */
export interface SubscriptionAddDto {
    endpoint: string;
    keys: {
        auth: string;
        p256dh: string;
    }
}
