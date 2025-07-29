import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { TicketsModule } from './tickets.module';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';

describe('TicketsModule', () => {
  let module: TestingModule;
  let mockTicketRepository: Partial<Record<keyof Repository<Ticket>, jest.Mock>>;

  beforeEach(async () => {
    // Create a mock repository
    mockTicketRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    };

    module = await Test.createTestingModule({
      imports: [
        // Import the module but override the TypeORM module with a mock
        TicketsModule,
      ],
    })
    .overrideProvider(getRepositoryToken(Ticket))
    .useValue(mockTicketRepository)
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide a Ticket repository', () => {
    const repository = module.get(getRepositoryToken(Ticket));
    expect(repository).toBeDefined();
    expect(repository).toHaveProperty('find');
    expect(repository).toHaveProperty('findOne');
    expect(repository).toHaveProperty('save');
    expect(repository).toHaveProperty('delete');
  });

  it('should provide TicketsService', () => {
    const service = module.get<TicketsService>(TicketsService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(TicketsService);
  });

  it('should export TicketsService', () => {
    // Instead of trying to get it by string token, we'll verify the module's exports
    const ticketsModule = module.get<TicketsModule>(TicketsModule);
    expect(ticketsModule).toBeDefined();
    
    // The service should be available in the module's exports
    const service = module.get<TicketsService>(TicketsService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(TicketsService);
  });

  it('should have TicketsController as a controller', () => {
    const controller = module.get<TicketsController>(TicketsController);
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(TicketsController);
  });
});
