# BizConsulting Platform

This repository is a monorepo for the BizConsulting platform, which includes both frontend and backend applications, as well as shared libraries.

## Repository Structure

```
├── apps/
│   ├── frontend/ (Angular 19)
│   │   ├── src/
│   │   │   ├── app/
│   └── backend/ (NestJS)
│       ├── src/
│       │   ├── app/
├── libs/ (shared libraries)
│   ├── interfaces/
│   │   ├── src/
│   │   │   ├── investment.interface.ts
│   │   │   ├── user.interface.ts
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   └── utils/
│       ├── src/
│       │   ├── api.utils.ts
│       │   ├── date.utils.ts
│       │   └── index.ts
│       └── tsconfig.json
│
├── package.json (workspace root)
├── nx.json
├── tsconfig.base.json
├── .prettierrc
└── .eslintrc.json
```

## Setting Up and Running the Project

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v12 or higher)
- NestJS CLI (v7 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Frontend Application

1. Navigate to the frontend application directory:
   ```sh
   cd apps/frontend
   ```

2. Start the development server:
   ```sh
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200`.

### Running the Backend Application

1. Navigate to the backend application directory:
   ```sh
   cd apps/backend
   ```

2. Start the development server:
   ```sh
   npm run start:dev
   ```

3. The backend server will be running at `http://localhost:3000`.

## Contributing

We welcome contributions to the BizConsulting platform! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear and concise messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

Please ensure that your code follows the project's coding standards and includes appropriate tests.

Thank you for contributing!
