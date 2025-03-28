import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Get()
  async getTelemetry(
    @Query('driver', ParseIntPipe) driver: number,
    @Query('session') session?: string,
    @Query('speed') speed?: string,     
    @Query('meeting') meeting?: string, 
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number
  ) {
    const sessionKey = session === 'latest' ? 'latest' : 
                       session ? parseInt(session, 10) : undefined;
    
    const meetingKey = meeting === 'latest' ? 'latest' : 
                       meeting ? parseInt(meeting, 10) : undefined;
    
    return this.telemetryService.getTelemetry(
      driver,
      sessionKey,
      speed,
      meetingKey,
      limit
    );
  }
}