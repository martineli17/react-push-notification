import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseFake } from './data/data-base-fake';
import { NotificationController } from './notification.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NotificationController],
  providers: [DataBaseFake],
})
export class AppModule {}
