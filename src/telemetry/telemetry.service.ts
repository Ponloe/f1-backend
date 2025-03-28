import { Injectable } from '@nestjs/common';
import { F1DataService } from '../f1-data/f1-data.service';

@Injectable()
export class TelemetryService {
  constructor(private readonly f1DataService: F1DataService) {}

  async getTelemetry(
    driverNumber: number, 
    sessionKey?: number | 'latest',
    speed?: string,
    meetingKey?: number | 'latest',
    limit: number = 20
  ) {
    try {
      return await this.f1DataService.getCarData({
        driver_number: driverNumber,
        session_key: sessionKey,
        speed: speed,
        meeting_key: meetingKey,
        limit
      });
    } catch (error) {
      console.error('Error fetching telemetry data:', error.message);
      throw new Error('Failed to fetch telemetry data');
    }
  }
}