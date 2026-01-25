import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private sync: SyncService) {}

  @Post('push')
  push(@Body() body: { userId: string; changes: any[] }) {
    return this.sync.push(body.userId, body.changes);
  }

  @Get('pull')
  pull(@Query('userId') userId: string, @Query('since') since: string) {
    return this.sync.pull(userId, Number(since));
  }
}
