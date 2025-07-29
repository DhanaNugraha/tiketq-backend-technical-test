import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

describe('TicketsController', () => {
  let controller: TicketsController;
  let service: TicketsService;

  const mockTicket: Ticket = {
    id: '1',
    eventName: 'Test Event',
    location: 'Test Location',
    time: '2025-12-31',
    isUsed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTicketsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    markAsUsed: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: mockTicketsService,
        },
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    service = module.get<TicketsService>(TicketsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ticket', async () => {
      const createTicketDto: CreateTicketDto = {
        eventName: 'Test Event',
        location: 'Test Location',
        time: '2025-12-31',
      };

      mockTicketsService.create.mockResolvedValue(mockTicket);

      const result = await controller.create(createTicketDto);

      expect(service.create).toHaveBeenCalledWith(createTicketDto);
      expect(result).toEqual(mockTicket);
    });
  });

  describe('findAll', () => {
    it('should return an array of tickets', async () => {
      mockTicketsService.findAll.mockResolvedValue([mockTicket]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTicket]);
    });
  });

  describe('findOne', () => {
    it('should return a single ticket', async () => {
      mockTicketsService.findOne.mockResolvedValue(mockTicket);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockTicket);
    });
  });

  describe('update', () => {
    it('should update a ticket', async () => {
      const updateTicketDto: UpdateTicketDto = {
        eventName: 'Updated Event',
      };

      const updatedTicket = { ...mockTicket, ...updateTicketDto };
      mockTicketsService.update.mockResolvedValue(updatedTicket);

      const result = await controller.update('1', updateTicketDto);

      expect(service.update).toHaveBeenCalledWith('1', updateTicketDto);
      expect(result).toEqual(updatedTicket);
    });
  });

  describe('markAsUsed', () => {
    it('should mark a ticket as used', async () => {
      const usedTicket = { ...mockTicket, isUsed: true };
      mockTicketsService.markAsUsed.mockResolvedValue(usedTicket);

      const result = await controller.markAsUsed('1');

      expect(service.markAsUsed).toHaveBeenCalledWith('1');
      expect(result).toEqual(usedTicket);
      expect(result.isUsed).toBe(true);
    });
  });

  describe('remove', () => {
    it('should delete a ticket', async () => {
      mockTicketsService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
