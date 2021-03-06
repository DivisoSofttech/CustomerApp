/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '//35.237.4.7:8070';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
