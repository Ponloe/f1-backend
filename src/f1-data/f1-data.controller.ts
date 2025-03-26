import { Controller, Get, Param, Query } from "@nestjs/common";
import { F1DataService } from "./f1-data.service";

@Controller('f1-data')
export class F1DataController {
  constructor(private readonly f1DataService: F1DataService) {}

  @Get('car-data')
  async getCarData(
    @Query('driver_number') driverNumber?: number,
    @Query('session_key') sessionKey?: number,
    @Query('speed') speed?: string,
    @Query('meeting_key') meetingKey?: number,
  ): Promise<any> {
    return this.f1DataService.getCarData({
      driver_number: driverNumber,
      session_key: sessionKey || 'latest',
      speed,
      meeting_key: meetingKey,
    });
  }
}