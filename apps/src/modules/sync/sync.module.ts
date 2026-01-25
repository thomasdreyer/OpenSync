import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { Change } from './change.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Change])],
  controllers: [SyncController],
  providers: [SyncService]
})
export class SyncModule {}
