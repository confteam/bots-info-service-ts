import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(req: Request, res: Response, next: (error?: any) => void) {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      this.logger.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    })

    next();
  }
}
