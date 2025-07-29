import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiProperty({
    example: true,
    description: 'Indicates if the ticket has been used',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isUsed?: boolean;
}
