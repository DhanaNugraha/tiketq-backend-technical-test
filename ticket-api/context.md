# Ticket API Project Context

## Project Overview
A production-ready NestJS-based REST API for managing event tickets. The application provides comprehensive CRUD operations with robust input validation, error handling, and Swagger documentation. The project follows best practices for NestJS development and includes a complete test suite.

## Current State
- **Version**: 1.0.0
- **Status**: Active Development
- **Last Updated**: July 2024

### Core Features
- **Ticket Management**:
  - Create, Read, Update, and Delete tickets
  - Mark tickets as used
  - Filter and sort tickets
- **Validation & Security**:
  - Request validation using class-validator
  - Proper error handling with HTTP status codes
  - Input sanitization
- **Documentation**:
  - Swagger/OpenAPI documentation
  - API versioning support
- **Database**:
  - SQLite with TypeORM
  - Database migrations
  - Connection pooling
- **Testing**:
  - Unit tests (Jest)
  - E2E tests (Supertest)
  - Test coverage reporting
- **DevOps**:
  - Docker support
  - CI/CD ready
  - Environment-based configuration

## Project Structure
```
ticket-api/
├── src/
│   ├── app.controller.ts         # Root controller
│   ├── app.module.ts            # Root module
│   ├── app.service.ts           # Root service
│   ├── main.ts                  # Application entry point
│   ├── database/                # Database configuration
│   │   └── database.module.ts   # Database module setup
│   └── tickets/                 # Tickets feature module
│       ├── dto/                 # Data Transfer Objects
│       │   ├── create-ticket.dto.ts
│       │   └── update-ticket.dto.ts
│       ├── entities/            # TypeORM entities
│       │   └── ticket.entity.ts
│       ├── tickets.controller.ts
│       ├── tickets.controller.spec.ts
│       ├── tickets.module.ts
│       └── tickets.service.ts
├── test/                        # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example                 # Environment variables example
├── docker-compose.yml           # Docker configuration
├── package.json                 # Project dependencies
└── tsconfig.json               # TypeScript configuration
```

## Technical Details

### Key Components
1. **Main Application**
   - `main.ts`: Configures NestJS application with global pipes, CORS, and Swagger documentation
   - `app.module.ts`: Imports and configures all application modules

2. **Ticket Module**
   - `ticket.entity.ts`: Defines the database schema and relationships
   - `tickets.service.ts`: Implements business logic with proper error handling
   - `tickets.controller.ts`: Defines REST endpoints with proper HTTP methods and status codes
   - `*.dto.ts`: Enforces data validation and transformation

### Test Coverage
```
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts| % Branch | % Funcs | % Lines | Uncovered Lines   
-------------------------|--------|----------|---------|---------|-------------------
All files                |  67.34 |    62.5  |   85    |  67.71  |                   
 src                     |  30.23 |    0     |   60    |  24.32  |                   
  app.controller.ts      |   100  |    100   |  100    |  100    |                   
  app.module.ts          |     0  |    100   |  100    |     0   | 1-24              
  app.service.ts         |   100  |    100   |  100    |  100    |                   
  main.ts                |     0  |    0     |    0    |     0   | 1-74              
 src/database            |     0  |    100   |    0    |     0   |                   
  database.module.ts     |     0  |    100   |    0    |     0   | 1-21              
 src/tickets             |  86.48 |  83.33   |  100    |  89.06  |                   
  tickets.controller.ts  |   100  |    100   |  100    |  100    |                   
  tickets.module.ts      |     0  |    100   |  100    |     0   | 1-15              
  tickets.service.ts     |  95.45 |  83.33   |  100    |  97.36  | 41                
 src/tickets/dto         |   100  |    100   |  100    |  100    |                   
  create-ticket.dto.ts   |   100  |    100   |  100    |  100    |                   
  update-ticket.dto.ts   |   100  |    100   |  100    |  100    |                   
 src/tickets/entities    |   100  |    100   |  100    |  100    |                   
  ticket.entity.ts       |   100  |    100   |  100    |  100    |                   
-------------------------|--------|----------|---------|---------|-------------------
```

### Dependencies
- **Core**:
  - @nestjs/common: ^10.0.0
  - @nestjs/core: ^10.0.0
  - @nestjs/platform-express: ^10.0.0
  - reflect-metadata: ^0.2.0
  - rxjs: ^7.8.0

- **Database**:
  - @nestjs/typeorm: ^10.0.0
  - typeorm: ^0.3.0
  - sqlite3: ^5.0.0

- **Validation & Serialization**:
  - class-validator: ^0.14.0
  - class-transformer: ^0.5.0

- **API Documentation**:
  - @nestjs/swagger: ^7.0.0

- **Testing**:
  - @nestjs/testing: ^10.0.0
  - jest: ^29.0.0
  - supertest: ^6.0.0
  - ts-jest: ^29.0.0
  - @nestjs/core: ^10.0.0
  - @nestjs/typeorm: ^10.0.0
  - typeorm: ^0.3.17
  - class-validator: ^0.14.0
  - class-transformer: ^0.5.1
  - better-sqlite3: ^8.6.0

- **Development**:
  - @nestjs/cli: ^11.0.0
  - @nestjs/schematics: ^11.0.0
  - @nestjs/testing: ^10.0.0
  - @types/jest: ^29.5.14
  - jest: ^29.7.0
  - ts-jest: ^29.2.5

## Current Issues
1. **TypeScript Module Resolution**:
   - Error: Cannot find module '@nestjs/common' or its corresponding type declarations
   - Need to ensure proper TypeScript configuration and module resolution

2. **Dependency Conflicts**:
   - Multiple versions of @nestjs packages between root and ticket-api
   - Need to align all @nestjs/* package versions

## Next Steps
1. Fix TypeScript module resolution in `tsconfig.json`
2. Align all @nestjs/* package versions
3. Test API endpoints
4. Run unit tests
5. Test Docker container build and run

## Running the Application
```bash
# Install dependencies
npm install

# Start in development mode
npm run start:dev

# Build for production
npm run build
npm run start:prod

# Run tests
npm test
```

## API Documentation
Once running, access the Swagger UI at: http://localhost:3000/api/docs
