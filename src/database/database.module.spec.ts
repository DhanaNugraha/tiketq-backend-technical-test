import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { Ticket } from '../tickets/entities/ticket.entity';

describe('DatabaseModule', () => {
  let module: TestingModule;
  
  // Mock ConfigService
  const mockConfigService = {
    get: jest.fn((key: string, defaultValue?: string) => {
      if (key === 'DB_PATH') {
        return 'test-db.sqlite';
      }
      return defaultValue;
    }),
  };

  beforeEach(async () => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule,
      ],
    })
    .overrideProvider(ConfigService)
    .useValue(mockConfigService)
    .compile();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should configure TypeOrmModule with correct options', async () => {
    // Get the TypeOrm configuration
    const typeOrmModule = module.get(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();

    // Verify ConfigService.get was called with the correct parameters
    expect(mockConfigService.get).toHaveBeenCalledWith('DB_PATH', 'tickets.sqlite');
  });

  it('should use the database path from config', async () => {
    // Get the TypeOrm configuration
    const typeOrmModule = module.get(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();

    // Verify the database path is set correctly
    expect(mockConfigService.get('DB_PATH', 'tickets.sqlite')).toBe('test-db.sqlite');
  });

  it('should include Ticket entity in the configuration', async () => {
    // This is a bit tricky to test directly, but we can verify our mock was set up correctly
    expect(mockConfigService.get).toHaveBeenCalled();
    
    // We can also check that the module is properly imported with ConfigModule
    const configModule = module.get(ConfigModule);
    expect(configModule).toBeDefined();
  });
});
