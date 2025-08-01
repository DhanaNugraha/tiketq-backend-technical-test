import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Ticket } from '../tickets/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get('DB_PATH', 'tickets.sqlite'),
        entities: [Ticket],
        synchronize: true, // In development only
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
