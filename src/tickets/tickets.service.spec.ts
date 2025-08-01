import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { NotFoundException } from '@nestjs/common';

describe('TicketsService', () => {
  let service: TicketsService;
  let repository: Repository<Ticket>;

  const mockTicket: Ticket = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    eventName: 'Test Event',
    location: 'Test Location',
    time: '2025-12-31',
    isUsed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTicketRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: getRepositoryToken(Ticket),
          useValue: mockTicketRepository,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
    repository = module.get<Repository<Ticket>>(getRepositoryToken(Ticket));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ticket', async () => {
      const createTicketDto: CreateTicketDto = {
        eventName: 'Test Event',
        location: 'Test Location',
        time: '2025-12-31',
      };

      mockTicketRepository.create.mockReturnValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue(mockTicket);

      const result = await service.create(createTicketDto);

      expect(repository.create).toHaveBeenCalledWith(createTicketDto);
      expect(repository.save).toHaveBeenCalledWith(mockTicket);
      expect(result).toEqual(mockTicket);
      expect(result.isUsed).toBe(false); // Ensure default value is set
    });

    it('should throw an error when database save fails', async () => {
      const createTicketDto: CreateTicketDto = {
        eventName: 'Test Event',
        location: 'Test Location',
        time: '2025-12-31',
      };

      mockTicketRepository.create.mockReturnValue(mockTicket);
      const dbError = new Error('Database error');
      mockTicketRepository.save.mockRejectedValue(dbError);

      await expect(service.create(createTicketDto)).rejects.toThrow('Failed to create ticket: Database error');
    });
  });

  describe('findAll', () => {
    it('should return an array of tickets', async () => {
      mockTicketRepository.find.mockResolvedValue([mockTicket]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockTicket]);
    });

    it('should return an empty array when no tickets exist', async () => {
      mockTicketRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database error');
      mockTicketRepository.find.mockRejectedValue(dbError);

      await expect(service.findAll()).rejects.toThrow('Failed to fetch tickets: Database error');
    });
  });

  describe('findOne', () => {
    it('should return a ticket by id', async () => {
      mockTicketRepository.findOne.mockResolvedValue(mockTicket);

      const result = await service.findOne('1');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(mockTicket);
    });

    it('should throw NotFoundException when ticket is not found', async () => {
      mockTicketRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });

    it('should handle database errors in findOne', async () => {
      const dbError = new Error('Database connection failed');
      mockTicketRepository.findOne.mockRejectedValue(dbError);

      await expect(service.findOne('1')).rejects.toThrow('Failed to fetch ticket: Database connection failed');
    });
  });

  describe('update', () => {
    it('should update a ticket', async () => {
      const updateTicketDto: UpdateTicketDto = {
        eventName: 'Updated Event',
      };

      const updatedTicket = { 
        ...mockTicket, 
        ...updateTicketDto,
        updatedAt: new Date() // Simulate updated timestamp
      };
      
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue(updatedTicket);

      const result = await service.update('1', updateTicketDto);

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
        ...mockTicket,
        ...updateTicketDto,
      }));
      expect(result).toEqual(updatedTicket);
      expect(result.updatedAt).not.toEqual(mockTicket.updatedAt);
    });

    it('should throw an error when update fails', async () => {
      const updateTicketDto: UpdateTicketDto = {
        eventName: 'Updated Event',
      };
      
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTicket);
      const dbError = new Error('Database error');
      mockTicketRepository.save.mockRejectedValue(dbError);

      await expect(service.update('1', updateTicketDto)).rejects.toThrow('Failed to update ticket: Database error');
    });

    it('should propagate NotFoundException from findOne', async () => {
      const updateTicketDto: UpdateTicketDto = {
        eventName: 'Non-existent Event',
      };
      
      const notFoundError = new NotFoundException('Ticket not found');
      jest.spyOn(service, 'findOne').mockRejectedValue(notFoundError);

      await expect(service.update('999', updateTicketDto)).rejects.toThrow(notFoundError);
      expect(service.findOne).toHaveBeenCalledWith('999');
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('markAsUsed', () => {
    it('should mark a ticket as used', async () => {
      const usedTicket = { 
        ...mockTicket, 
        isUsed: true,
        updatedAt: new Date() // Simulate updated timestamp
      };
      
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue(usedTicket);

      const result = await service.markAsUsed('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
        ...mockTicket,
        isUsed: true,
      }));
      expect(result.isUsed).toBe(true);
      expect(result.updatedAt).not.toEqual(mockTicket.updatedAt);
    });

    it('should handle error when marking a non-existent ticket', async () => {
      const notFoundError = new NotFoundException('Ticket not found');
      jest.spyOn(service, 'findOne').mockRejectedValue(notFoundError);

      await expect(service.markAsUsed('999')).rejects.toThrow(notFoundError);
    });

    it('should handle database errors during update', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTicket);
      const dbError = new Error('Database error');
      mockTicketRepository.save.mockRejectedValue(dbError);

      await expect(service.markAsUsed('1')).rejects.toThrow('Failed to mark ticket as used: Database error');
    });
  });

  describe('remove', () => {
    it('should remove a ticket', async () => {
      mockTicketRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove('1');

      expect(repository.delete).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException when ticket to delete is not found', async () => {
      mockTicketRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
      await expect(service.remove('999')).rejects.toThrow('Ticket with ID "999" not found');
    });

    it('should handle database errors during deletion', async () => {
      const dbError = new Error('Database error');
      mockTicketRepository.delete.mockRejectedValue(dbError);

      await expect(service.remove('1')).rejects.toThrow('Failed to delete ticket: Database error');
    });
  });
});
