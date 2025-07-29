# Ticket API

A production-ready NestJS-based REST API for managing event tickets. This application provides comprehensive CRUD operations with robust input validation, error handling, and Swagger documentation. The project follows best practices for NestJS development and includes a complete test suite.

## 🚀 Features

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

## 📊 Test Coverage

```
-------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------|---------|----------|---------|---------|-------------------
All files               |     100 |      100 |     100 |     100 |                   
 tickets                |     100 |      100 |     100 |     100 |                   
  tickets.controller.ts |     100 |      100 |     100 |     100 |                   
  tickets.service.ts    |     100 |      100 |     100 |     100 |                   
 tickets/dto            |     100 |      100 |     100 |     100 |                  
  create-ticket.dto.ts  |     100 |      100 |     100 |     100 |                  
  update-ticket.dto.ts  |     100 |      100 |     100 |     100 |                  
 tickets/entities       |     100 |      100 |     100 |     100 |                  
  ticket.entity.ts      |     100 |      100 |     100 |     100 |                  
-------------------------|---------|----------|---------|---------|-------------------
```

> **Note**: The following files are excluded from test coverage:
> - `main.ts` - Application entry point (manually tested)
> - `app.module.ts` - Root module (covered by dedicated unit tests)
> - `database.module.ts` - Database module (covered by dedicated unit tests)

## 🧪 Testing

### Unit Tests
- All core modules and services have dedicated unit tests
- 100% test coverage on all business logic
- Mocked external dependencies for reliable testing

### Integration Tests
- Database integration tests for repositories
- Module integration tests for service interactions
- End-to-end API tests for critical flows

## 🛠️ Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn
- Docker (optional, for containerized development)
- SQLite3

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticket-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure the `.env` file with your preferred settings.

4. **Database Setup**
   The application uses SQLite by default. The database file will be automatically created at `tickets.sqlite` in the project root when the application starts.

5. **Running the Application**
   ```bash
   # Development mode with hot-reload
   npm run start:dev
   
   # Or run with Docker
   docker-compose up --build
   ```

6. **Access the API**
   - API Base URL: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api/docs`

## 🏗️ Build & Run

### Development
```bash
# Start development server with hot-reload
npm run start:dev

# Build the application
npm run build

# Run in production mode
npm run start:prod
```

### Docker
```bash
# Build and start the application with Docker
docker-compose up --build

# Stop the application
docker-compose down
```

## 📚 API Documentation

Once the application is running, you can access:
- **Swagger UI**: `http://localhost:3000/api/docs`
- **API Base URL**: `http://localhost:3000`

## 🔌 API Endpoints

### Tickets

#### Create a Ticket
- **Method**: `POST /tickets`
- **Request Body**:
  ```json
  {
    "eventName": "Concert",
    "location": "Main Hall",
    "time": "2025-12-31T20:00:00.000Z"
  }
  ```

#### Get All Tickets
- **Method**: `GET /tickets`
- **Query Parameters**:
  - `eventName`: Filter by event name
  - `location`: Filter by location
  - `isUsed`: Filter by ticket usage status (true/false)
  - `sort`: Sort by field (e.g., `eventName,ASC` or `time,DESC`)

#### Get a Specific Ticket
- **Method**: `GET /tickets/:id`
- **Parameters**:
  - `id`: Ticket ID (UUID)

#### Update a Ticket
- **Method**: `PATCH /tickets/:id`
- **Parameters**:
  - `id`: Ticket ID (UUID)
- **Request Body**: (Partial updates supported)
  ```json
  {
    "eventName": "Updated Concert Name",
    "location": "New Location"
  }
  ```

#### Mark a Ticket as Used
- **Method**: `PATCH /tickets/:id/mark-used`
- **Parameters**:
  - `id`: Ticket ID (UUID)

#### Delete a Ticket
- **Method**: `DELETE /tickets/:id`
- **Parameters**:
  - `id`: Ticket ID (UUID)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run e2e tests
npm run test:e2e

# Run tests with coverage report
npm run test:cov

# Watch mode (useful during development)
npm run test:watch
```

### Test Structure
- Unit tests: `*.spec.ts` files alongside source files
- E2E tests: `*.e2e-spec.ts` files in the `test/` directory
- Test utilities: `test/` directory

## 🛠 Development

### Code Style

This project uses ESLint and Prettier to maintain consistent code style. The following commands are available:

```bash
# Check for linting issues
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Format code according to Prettier rules
npm run format

# Check TypeScript types
tsc --noEmit
```

### Git Hooks

Pre-commit hooks are set up to run:
- Linting checks
- Unit tests
- Code formatting

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification. Example commit messages:

```
feat: add ticket validation
fix: resolve database connection issue
docs: update API documentation
chore: update dependencies
test: add unit tests for ticket service
refactor: improve error handling
```

## 🔧 Project Structure

```
ticket-api/
├── src/                    # Source files
│   ├── app.controller.ts   # Root controller
│   ├── app.module.ts       # Root module
│   ├── app.service.ts      # Root service
│   ├── main.ts             # Application entry point
│   ├── database/           # Database configuration
│   └── tickets/            # Tickets feature module
│       ├── dto/            # Data Transfer Objects
│       ├── entities/        # TypeORM entities
│       ├── *.controller.ts  # Controllers
│       └── *.service.ts     # Services
├── test/                   # E2E tests
├── .env.example            # Environment variables example
├── docker-compose.yml      # Docker configuration
└── package.json            # Project configuration
```

## 📦 Dependencies

### Core Dependencies
- `@nestjs/*`: NestJS framework modules
- `typeorm`: ORM for database operations
- `class-validator`: Request validation
- `class-transformer`: Object transformation

### Development Dependencies
- `@types/*`: TypeScript type definitions
- `jest`: Testing framework
- `supertest`: HTTP assertions
- `eslint`: Code linting
- `prettier`: Code formatting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



