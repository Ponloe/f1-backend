// src/f1-data/f1-data.service.ts
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

type ApiParam = string | number | 'latest';

interface CarDataParams {
  driver_number?: number;
  session_key?: number | 'latest';
  speed?: string;
  meeting_key?: number | 'latest';
  [key: string]: ApiParam | undefined;
}

@Injectable()
export class F1DataService {
  private readonly apiBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiBaseUrl = this.configService.get<string>('OPENF1_API_BASE_URL');
  }

  async getCarData(params: CarDataParams): Promise<any> {
    return this.fetchFromOpenF1('car_data', params);
  }

  private async fetchFromOpenF1(endpoint: string, params: Record<string, ApiParam>): Promise<any> {
    try {
      const url = this.buildUrl(endpoint, params);
      console.log('Calling URL:', url);
      
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw new HttpException(`Failed to fetch ${endpoint}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private buildUrl(endpoint: string, params: Record<string, ApiParam>): string {
    const baseUrl = `${this.apiBaseUrl}/${endpoint}`;
    const queryString = this.buildQueryString(params);
    
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  private buildQueryString(params: Record<string, ApiParam>): string {
    const queryParts = [];
    
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;
      
      if (typeof value === 'string' && this.isComparisonOperator(value)) {
        queryParts.push(`${key}${value}`);
      } else {
        queryParts.push(`${key}=${value}`);
      }
    }
    
    return queryParts.join('&');
  }

  private isComparisonOperator(value: string): boolean {
    return value.includes('>=') || value.includes('<=') || 
           value.includes('>') || value.includes('<');
  }

  // Add more methods to fetch other data as needed (e.g., pit stops, driver standings, etc.)
  // For example:
  // async getPitStops(params: PitStopParams): Promise<any> {
  //   return this.fetchFromOpenF1('pit_stops', params);
  // }
}