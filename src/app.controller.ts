import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('v1')
@ApiTags('YourController')
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Hello' })
  @ApiResponse({ status: 200, description: 'Returns the hello message' })
  getHello(@Request() req): string {
    return req.user
  }
}
