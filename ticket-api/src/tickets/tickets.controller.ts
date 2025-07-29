import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new ticket',
    description: 'Creates a new ticket with the provided event details.'
  })
  @ApiBody({ 
    type: CreateTicketDto,
    examples: {
      basic: {
        summary: 'Basic ticket creation',
        value: {
          eventName: 'Summer Music Festival 2025',
          location: 'Central Park, New York',
          time: '2025-08-15'
        }
      },
      vip: {
        summary: 'VIP ticket creation',
        value: {
          eventName: 'Exclusive Gala Dinner',
          location: 'Grand Ballroom, The Ritz',
          time: '2025-09-20'
        }
      }
    }
  })
  @ApiCreatedResponse({ 
    description: 'The ticket has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
        eventName: { type: 'string', example: 'Summer Music Festival 2025' },
        location: { type: 'string', example: 'Central Park, New York' },
        time: { type: 'string', format: 'date', example: '2025-08-15' },
        isUsed: { type: 'boolean', example: false },
        createdAt: { type: 'string', format: 'date-time', example: '2025-07-29T09:30:00.000Z' },
        updatedAt: { type: 'string', format: 'date-time', example: '2025-07-29T09:30:00.000Z' }
      }
    },
    headers: {
      'Location': {
        description: 'URL to the created ticket',
        schema: { 
          type: 'string', 
          format: 'uri',
          example: 'http://localhost:3000/api/tickets/123e4567-e89b-12d3-a456-426614174000'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data.',
    schema: {
      example: {
        statusCode: 400,
        message: ['property invalidProp should not exist'],
        error: 'Bad Request'
      }
    }
  })
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all tickets',
    description: 'Retrieves a list of all tickets with their details.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Successfully retrieved all tickets.',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          eventName: 'Summer Music Festival 2025',
          location: 'Central Park, New York',
          time: '2025-08-15',
          isUsed: false,
          createdAt: '2025-07-29',
          updatedAt: '2025-07-29'
        },
        {
          id: '223e4567-e89b-12d3-a456-426614174001',
          eventName: 'Tech Conference 2025',
          location: 'Convention Center',
          time: '2025-09-10',
          isUsed: false,
          createdAt: '2025-07-28',
          updatedAt: '2025-07-28'
        }
      ]
    }
  })
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a ticket by ID',
    description: 'Retrieves detailed information about a specific ticket.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID of the ticket to retrieve',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Successfully retrieved the ticket.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        eventName: 'Summer Music Festival 2025',
        location: 'Central Park, New York',
        time: '2025-08-15',
        isUsed: false,
        createdAt: '2025-07-29',
        updatedAt: '2025-07-29'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Ticket not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Ticket with ID 123e4567-e89b-12d3-a456-426614174000 not found',
        error: 'Not Found'
      }
    }
  })
  findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) id: string,
  ): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a ticket',
    description: 'Updates the details of an existing ticket.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID of the ticket to update',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({
    type: UpdateTicketDto,
    examples: {
      updateLocation: {
        summary: 'Update location',
        value: {
          location: 'New Venue, Downtown',
          time: '2025-08-15'
        }
      },
      markAsUsed: {
        summary: 'Mark as used',
        value: {
          isUsed: true
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'The ticket has been successfully updated.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        eventName: 'Summer Music Festival 2025',
        location: 'New Venue, Downtown',
        time: '2025-08-15',
        isUsed: true,
        createdAt: '2025-07-29',
        updatedAt: '2025-07-29'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data.',
    schema: {
      example: {
        statusCode: 400,
        message: ['time must be a valid ISO 8601 date string'],
        error: 'Bad Request'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Ticket not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Ticket with ID 123e4567-e89b-12d3-a456-426614174000 not found',
        error: 'Not Found'
      }
    }
  })
  update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Patch(':id/mark-used')
  @ApiOperation({ 
    summary: 'Mark a ticket as used',
    description: 'Marks a ticket as used. This operation cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID of the ticket to mark as used',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'The ticket has been successfully marked as used.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        eventName: 'Summer Music Festival 2025',
        location: 'Central Park, New York',
        time: '2025-08-15',
        isUsed: true,
        createdAt: '2025-07-29',
        updatedAt: '2025-07-29'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Ticket not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Ticket with ID 123e4567-e89b-12d3-a456-426614174000 not found',
        error: 'Not Found'
      }
    }
  })
  markAsUsed(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) id: string,
  ): Promise<Ticket> {
    return this.ticketsService.markAsUsed(id);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a ticket',
    description: 'Permanently deletes a ticket. This action cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID of the ticket to delete',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'The ticket has been successfully deleted.',
    schema: {
      example: {
        raw: [],
        affected: 1
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Ticket not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Ticket with ID 123e4567-e89b-12d3-a456-426614174000 not found',
        error: 'Not Found'
      }
    }
  })
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) id: string,
  ): Promise<void> {
    return this.ticketsService.remove(id);
  }
}
