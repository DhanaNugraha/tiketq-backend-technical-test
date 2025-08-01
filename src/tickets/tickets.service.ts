import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    try {
      const ticket = this.ticketsRepository.create(createTicketDto);
      return await this.ticketsRepository.save(ticket);
    } catch (error) {
      throw new Error(`Failed to create ticket: ${error.message}`);
    }
  }

  async findAll(): Promise<Ticket[]> {
    try {
      return await this.ticketsRepository.find();
    } catch (error) {
      throw new Error(`Failed to fetch tickets: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Ticket> {
    try {
      const ticket = await this.ticketsRepository.findOne({ where: { id } });
      if (!ticket) {
        throw new NotFoundException(`Ticket with ID "${id}" not found`);
      }
      return ticket;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Failed to fetch ticket: ${error.message}`);
    }
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    try {
      const ticket = await this.findOne(id);
      Object.assign(ticket, updateTicketDto);
      return await this.ticketsRepository.save(ticket);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Failed to update ticket: ${error.message}`);
    }
  }

  async markAsUsed(id: string): Promise<Ticket> {
    try {
      const ticket = await this.findOne(id);
      ticket.isUsed = true;
      return await this.ticketsRepository.save(ticket);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Failed to mark ticket as used: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.ticketsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Ticket with ID "${id}" not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Failed to delete ticket: ${error.message}`);
    }
  }
}
