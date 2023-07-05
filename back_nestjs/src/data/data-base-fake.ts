/* eslint-disable prettier/prettier */
import { Injectable, Scope } from '@nestjs/common';
import { SubscriptionAddDto } from 'src/dtos/subscription-add.dto';
import { SubscriptionDto } from 'src/dtos/subscription.dto';

@Injectable({ scope: Scope.DEFAULT })
export class DataBaseFake {
  private static _subscriptions: SubscriptionDto[] = [];

  addSubscription = (
    subscription: SubscriptionAddDto,
    key: string,
  ): SubscriptionDto => {
    const indexExistsItem = DataBaseFake._subscriptions.findIndex(
      (x) => x.key == key,
    );
    const newSubscription = {
      ...subscription,
      key,
    };

    if (indexExistsItem > 0)
      DataBaseFake._subscriptions.splice(indexExistsItem, 1);
    DataBaseFake._subscriptions.push(newSubscription);

    return newSubscription;
  };

  getSubscription = (key: string): SubscriptionDto => {
    return DataBaseFake._subscriptions.find((x) => x.key == key);
  };

  getAllKeys = (): string[] => {
    return DataBaseFake._subscriptions.map((x) => x.key);
  };
}
