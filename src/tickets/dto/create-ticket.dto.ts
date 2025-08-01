import { IsString, IsNotEmpty, IsDateString, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Custom validator for YYYY-MM-DD date format
function IsDateStringFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateStringFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date in YYYY-MM-DD format`;
        },
      },
    });
  };
}

export class CreateTicketDto {
  @ApiProperty({
    example: 'Summer Music Festival 2025',
    description: 'The name of the event',
  })
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @ApiProperty({
    example: 'Central Park, New York',
    description: 'The location where the event will take place',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: '2025-08-15',
    description: 'The date of the event in YYYY-MM-DD format',
  })
  @IsString()
  @IsNotEmpty()
  @IsDateStringFormat()
  time: string;
}
