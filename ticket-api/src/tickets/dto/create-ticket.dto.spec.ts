import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTicketDto } from './create-ticket.dto';

describe('CreateTicketDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = plainToInstance(CreateTicketDto, {
      eventName: 'Summer Music Festival 2025',
      location: 'Central Park, New York',
      time: '2025-08-15',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with empty eventName', async () => {
    const dto = plainToInstance(CreateTicketDto, {
      eventName: '',
      location: 'Central Park, New York',
      time: '2025-08-15',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with empty location', async () => {
    const dto = plainToInstance(CreateTicketDto, {
      eventName: 'Summer Music Festival 2025',
      location: '',
      time: '2025-08-15',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with empty time', async () => {
    const dto = plainToInstance(CreateTicketDto, {
      eventName: 'Summer Music Festival 2025',
      location: 'Central Park, New York',
      time: '',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with invalid date format', async () => {
    const dto = plainToInstance(CreateTicketDto, {
      eventName: 'Summer Music Festival 2025',
      location: 'Central Park, New York',
      time: '15-08-2025', // Invalid format (should be YYYY-MM-DD)
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDateStringFormat');
  });

  it('should fail validation with invalid date', async () => {
    const dto = plainToInstance(CreateTicketDto, {
      eventName: 'Summer Music Festival 2025',
      location: 'Central Park, New York',
      time: '2025-13-01', // Invalid date (month 13 doesn't exist)
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDateStringFormat');
  });

  it('should fail validation with non-string values', async () => {
    const dto = plainToInstance(CreateTicketDto, {
      eventName: 12345,
      location: 12345,
      time: 12345,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(3); // All fields should fail validation
    expect(errors[0].constraints).toHaveProperty('isString');
    expect(errors[1].constraints).toHaveProperty('isString');
    expect(errors[2].constraints).toHaveProperty('isString');
  });
});
