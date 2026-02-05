import { Injectable } from '@nestjs/common';
import { Repository, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Change } from './change.entity';

export type SyncChangeInput = {
  collection: string;
  data: Record<string, unknown>;
};

@Injectable()
export class SyncService {
  constructor(@InjectRepository(Change) private changes: Repository<Change>) {}

  async push(userId: string, items: SyncChangeInput[]) {
    const saved = [];
    for (const item of items) {
      const change = this.changes.create({
        userId,
        collection: item.collection,
        data: item.data,
        version: Date.now()
      });
      saved.push(await this.changes.save(change));
    }
    return saved;
  }

  async pull(userId: string, since: number) {
    return this.changes.find({
      where: { userId, version: MoreThan(since) },
      order: { version: 'ASC' }
    });
  }
}
