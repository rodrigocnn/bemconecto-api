# Bem Conecto API

Backend API for managing a psychology clinic workflow, including professionals, users, patients, appointments, sessions, and authentication.

This project was built with a clear separation of concerns in mind. It uses NestJS for the application shell, Prisma for data access, and a layered structure that keeps business rules independent from delivery and infrastructure details.

## Why This Project Is Interesting

- Clean modular organization with `domain`, `application`, `presentation`, and `infra` layers
- Explicit use case classes instead of controller-heavy business logic
- Repository abstraction with interchangeable implementations
- Practical authentication flow with hashed passwords and JWT tokens
- Consistent mapping between domain objects and HTTP responses
- Unit tests focused on use case behavior
- Prisma schema modeled around a real clinic workflow rather than a toy CRUD example

## Tech Stack

- NestJS
- TypeScript
- Prisma
- MySQL
- JWT
- Bcrypt
- Jest

## Architecture Overview

The codebase follows a pragmatic layered architecture:

- `domain`
  Core entities and enums such as `User`, `Professional`, `Patient`, `Appointment`, and `Session`
- `application`
  Use cases, contracts, mappers, and shared result handling
- `presentation`
  Controllers, DTOs, and response mappers
- `infra`
  Nest modules, Prisma repositories, auth providers, and framework integration

This structure makes the code easier to test, easier to evolve, and less coupled to NestJS or Prisma-specific details.

## Main Capabilities

- Professional management
- User management
- Patient management
- Appointment scheduling
- Session records
- Login with JWT token generation

## Data Model Highlights

The Prisma schema includes:

- `Professional`
- `User`
- `Patient`
- `Appointment`
- `Session`

The relationships are designed for a multi-user clinic context, including:

- users linked to a professional
- patients scoped to a professional
- appointments connected to both professionals and patients
- session notes with fields for therapeutic follow-up

## Notable Implementation Choices

- Soft delete support appears across core entities through `deletedAt`
- Use cases depend on repository contracts instead of concrete database classes
- HTTP responses are shaped through mappers, keeping controllers thin
- Password hashing and token generation are exposed through provider contracts
- In-memory repositories are used in tests, which keeps the test suite fast and focused

## Project Structure

```text
src/
  domain/
  application/
  presentation/
  infra/
```

## Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Configure environment variables

Create a `.env` file with at least:

```env
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
JWT_SECRET="your-secret"
JWT_EXPIRES_IN="7d"
```

### 3. Generate the Prisma client

```bash
yarn prisma:generate
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the application

```bash
yarn start:dev
```

## Scripts

```bash
yarn build
yarn start
yarn start:dev
yarn start:prod
yarn test
yarn test:cov
yarn lint
```

## API Notes

Example auth endpoint:

```http
POST /auth/login
```

The login flow returns:

- `accessToken`
- authenticated user metadata

Other modules expose REST-style endpoints for users, professionals, patients, appointments, and sessions.

## Testing

The project includes unit tests for use cases and core domain behavior. The current suite emphasizes application logic over framework internals, which is a good fit for the layered design used here.

## Final Note

This repository is a solid example of backend engineering beyond basic CRUD. It shows attention to architecture, clear dependency boundaries, and business-oriented modeling, which are qualities that matter in production teams.
