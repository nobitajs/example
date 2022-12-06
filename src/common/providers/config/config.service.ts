import { Injectable } from '@nestjs/common';
import defaultConfig from '@/config/config.default';
import merge from 'lodash/merge';

@Injectable()
export class ConfigService {
  constructor() {
    const env = process.env.RUN_ENV
    const config = require(`../../../config/config.${env}`);
    this.config = merge({
      env,
    }, defaultConfig, config.default);
    
  }

  config: object

  get(key?: string) {
    return !!key ? this.config[key] : this.config;
  }
  
};