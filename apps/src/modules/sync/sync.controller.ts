import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PushDto } from './dto/push.dto';
import { PullDto } from './dto/pull.dto';

type AuthenticatedRequest = Request & {
  user: {
    userId: string;
    email: string;
  };
};

@Controller('sync')
@UseGuards(JwtAuthGuard)
export class SyncController {
  constructor(private sync: SyncService) {}

  @Post('push')
  push(@Req() req: AuthenticatedRequest, @Body() body: PushDto) {
    return this.sync.push(req.user.userId, body.changes);
  }

  @Get('pull')
  pull(@Req() req: AuthenticatedRequest, @Query() query: PullDto) {
    return this.sync.pull(req.user.userId, query.since);
  }
}
