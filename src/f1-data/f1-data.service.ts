// src/f1-data/f1-data.service.ts
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class F1DataService {
  private readonly openF1ApiBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.openF1ApiBaseUrl = this.configService.get<string>('OPENF1_API_BASE_URL');
  }

  async getCarData(params: {
    driver_number?: number;
    session_key?: number | 'latest';
    speed?: string;
    meeting_key?: number | 'latest';
  }): Promise<any> {
    try {
      let url = 'https://api.openf1.org/v1/car_data';
      
      let queryParts = [];
      
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {

          if (typeof value === 'string' && (value.includes('>=') || value.includes('<=') || value.includes('>') || value.includes('<'))) {

            queryParts.push(`${key}${value}`);
          } else {

            queryParts.push(`${key}=${value}`);
          }
        }
      }
      
      if (queryParts.length > 0) {
        url += '?' + queryParts.join('&');
      }
      
      console.log('Calling URL:', url); // Debugging
      
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching car data:', error);
      throw new HttpException('Failed to fetch car data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
  // Add more methods to fetch other data as needed (e.g., pit stops, driver standings, etc.)