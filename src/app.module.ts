import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { F1DataModule } from './f1-data/f1-data.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), F1DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}