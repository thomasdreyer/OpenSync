import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SyncModule } from './sync/sync.module';
import { User } from './auth/user.entity';
import { Change } from './sync/change.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'opensync',
      entities: [User, Change],
      synchronize: true
    }),
    AuthModule,
    SyncModule
  ]
})
export class AppModule {}
