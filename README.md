# BizConsulting Platform

Welcome to the **BizConsulting Platform**, an advanced platform designed to streamline business consulting processes with a focus on scalability, performance, and security. This documentation will guide you through the features, setup, and best practices for contributing to the platform.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Code Guidelines](#code-guidelines)
- [Security Best Practices](#security-best-practices)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

The **BizConsulting Platform** is a robust application designed to facilitate business consulting workflows. It provides tools for data visualization, task management, and client interaction. Built with a modern tech stack, it ensures seamless integration, high performance, and top-notch security.

---

## Features

- **Data Visualization**: Interactive dashboards with charts and graphs powered by Chart.js.
- **Task Management**: Manage projects, tasks, and workflows efficiently.
- **Secure Authentication**: Uses JWT for authentication and argon2 for password hashing.
- **Responsive Design**: Built with Tailwind CSS for a fully responsive and modern UI.
- **Highly Typed Codebase**: Ensures strict TypeScript typing and interfaces for maintainability.
- **Production-Grade Error Handling**: A robust system for handling errors across the application.
- **Scalability**: Designed with scalability in mind using NestJS and Prisma ORM.

---

## Technology Stack

The platform is built with the following technologies:

- **Frontend**: Angular 19 with TypeScript (strict mode enabled).
- **Backend**: NestJS framework with TypeScript.
- **Database**: Prisma ORM for database management and schema migrations.
- **Styling**: Tailwind CSS for responsive, modern UI design.
- **Libraries**:
  - **Chart.js**: For data visualization and interactive charts.
  - **RXJS**: For reactive programming in Angular.
  - **argon2**: For secure password hashing.
  - **jsonwebtoken**: For secure user authentication.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

1. **Node.js**: Version 18 or higher.
2. **npm** or **yarn**: Package manager.
3. **TypeScript**: Version 4.9 or higher with strict mode enabled.
4. **PostgreSQL**: For the database (or any database supported by Prisma).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sisovin/bizconsulting-platform.git
   ```

2. Navigate to the project directory:
   ```bash
   cd bizconsulting-platform
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database with Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

---

## Code Guidelines

### TypeScript Strict Mode

Strict TypeScript mode must be enabled in the `tsconfig.json` file to ensure robust code quality. This includes:

- `strictNullChecks`
- `noImplicitAny`
- `strictPropertyInitialization`

### Proper Typing and Interfaces

All functions, classes, and components must use explicit typings and interfaces. Avoid using `any` unless absolutely necessary.

### Error Handling

Use production-grade error handling with global interceptors and middleware. All errors should be logged and provide meaningful messages to users without exposing sensitive information.

Example:
```typescript
@Catch(HttpException)
export class HttpErrorFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
```

---

## Security Best Practices

1. **JWT Authentication**: Ensure token expiration and signature validation.
2. **argon2 Password Hashing**: Use `argon2` for secure password storage.
3. **Environment Variables**: Store sensitive configurations (e.g., JWT secret) in `.env` files.

Example `.env` variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/bizconsulting
JWT_SECRET=your-secret-key
```

4. **CORS Configuration**: Restrict access to trusted domains.
5. **Input Validation**: Validate all user inputs using class-validator in NestJS.

---

## Folder Structure

```
bizconsulting-platform/
├── src/
│   ├── app/              # Angular application components
│   ├── assets/           # Static assets
│   ├── environments/     # Environment-specific configurations
│   ├── styles/           # Tailwind CSS styles
│   ├── main.ts           # Angular entry point
│   └── index.html        # Main HTML file
├── prisma/               # Prisma schema and migrations
├── server/               # NestJS backend application
│   ├── auth/             # Authentication module
│   ├── users/            # User management module
│   ├── guards/           # Security guards
│   └── main.ts           # NestJS entry point
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
```

---

## Contributing

We welcome contributions to enhance the BizConsulting Platform. Here's how you can contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute this software in compliance with the license.

---

## Contact

For questions, suggestions, or support, please contact the repository owner:

- **GitHub**: [sisovin](https://github.com/sisovin)

Feel free to open an issue in the repository if you encounter any problems or have feature requests.
