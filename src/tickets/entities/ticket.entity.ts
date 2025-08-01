import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsDateString, IsBoolean, IsString } from 'class-validator';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  location: string;

  @Column({ type: 'varchar', length: 10 })
  @IsNotEmpty()
  @IsString()
  time: string;

  @Column({ default: false })
  @IsBoolean()
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
