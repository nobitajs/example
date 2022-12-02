import { Injectable } from '@nestjs/common';
import defaultConfig from '../../../config/config.default';
import * as merge from 'lodash/merge';

@Injectable()
export class ConfigService {
  constructor() {
    const env = 'local'
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