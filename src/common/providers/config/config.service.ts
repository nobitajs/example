import { Injectable } from '@nestjs/common';
import defaultConfig from '../../../config/config.default';
import * as merge from 'lodash/merge';

@Injectable()
export class ConfigService {
  constructor() {
    const config = require(`../../../config/config.${process.env.RUN_ENV}`);
    this.config = merge({
      env: process.env.RUN_ENV,
    }, defaultConfig, config.default);
    
  }

  config: object

  get(key?: string) {
    return !!key ? this.config[key] : this.config;
  }
  
};