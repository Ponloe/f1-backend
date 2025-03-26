import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { F1DataController } from './f1-data.controller';
import { F1DataService } from './f1-data.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule, 
  ],
  controllers: [F1DataController],
  providers: [F1DataService],
})
export class F1DataModule {}