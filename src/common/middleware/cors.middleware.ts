import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
    res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    if (req.method == 'OPTIONS') {
      res.end();
    } else {
      next();
    }

  }
}