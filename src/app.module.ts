import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { F1DataModule } from './f1-data/f1-data.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelemetryModule } from './telemetry/telemetry.module';
@Module({
  imports: [
    ConfigModule.forRoot(), 
    F1DataModule,
    TelemetryModule,
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}