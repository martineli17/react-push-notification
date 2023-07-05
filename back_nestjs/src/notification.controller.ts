/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import * as webPush from 'web-push'
import { DataBaseFake } from './data/data-base-fake';
import { PublishMessageDto } from './dtos/publish-message.dto';
import { SubscriptionAddDto } from './dtos/subscription-add.dto';

@Controller()
export class NotificationController {
  constructor(private readonly _dataBaseFake: DataBaseFake) {}

  @Post('subscriber/:key')
  Subscriber(
    @Body() subscription: SubscriptionAddDto,
    @Param('key') key: string,
    @Res() response: Response,
  ) {
    this._dataBaseFake.addSubscription(subscription, key);
    response.status(201);
  }

  @Get('keys')
  Keys(@Res() response: Response) {
    const result = this._dataBaseFake.getAllKeys();
    const statusCode = result.length > 0 ? 200 : 204;

    response.status(statusCode).json(result).send();
  }

  @Post('push/:key')
  Push(
    @Body() payload: PublishMessageDto,
    @Param('key') key: string,
    @Res() response: Response,
  ) {
    const subscription = this._dataBaseFake.getSubscription(key);
    
    if (subscription) {
    webPush.sendNotification(subscription, JSON.stringify(payload));
      response.status(200);
    } else
      response
        .status(404)
        .json({ message: 'Subscription not found for this key' });

    response.send();
  }
}
