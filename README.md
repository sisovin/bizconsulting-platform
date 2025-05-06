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

### Running the Project with Docker

1. Ensure you have Docker and Docker Compose installed on your machine.

2. Navigate to the root directory of the project:
   ```sh
   cd workspace-blank
   ```

3. Start the services using Docker Compose:
   ```sh
   docker-compose up --build
   ```

4. The frontend application will be available at `http://localhost`, and the backend application will be available at `http://localhost:3000`.

### Setting Up and Running the GitHub Actions Workflow

1. Ensure you have a GitHub repository for your project.

2. Create a `.github/workflows` directory in the root of your project if it doesn't already exist.

3. Add a `ci.yml` file to the `.github/workflows` directory with the following content:
   ```yaml
   name: CI/CD Pipeline

   on:
     pull_request:
       branches:
         - main
     push:
       branches:
         - main

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v2

         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '14'

         - name: Install dependencies
           run: npm install

         - name: Run tests
           run: npm run test

     build:
       runs-on: ubuntu-latest
       needs: test
       steps:
         - name: Checkout code
           uses: actions/checkout@v2

         - name: Set up Docker Buildx
           uses: docker/setup-buildx-action@v1

         - name: Log in to Docker Hub
           uses: docker/login-action@v1
           with:
             username: ${{ secrets.DOCKER_USERNAME }}
             password: ${{ secrets.DOCKER_PASSWORD }}

         - name: Build and push Docker image
           uses: docker/build-push-action@v2
           with:
             context: .
             push: true
             tags: ${{ secrets.DOCKER_USERNAME }}/bizconsulting-platform:latest

     deploy:
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Checkout code
           uses: actions/checkout@v2

         - name: Set up SSH
           uses: webfactory/ssh-agent@v0.5.3
           with:
             ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

         - name: Deploy to staging
           run: |
             ssh -o StrictHostKeyChecking=no ${{ secrets.STAGING_USER }}@${{ secrets.STAGING_HOST }} << 'EOF'
             docker pull ${{ secrets.DOCKER_USERNAME }}/bizconsulting-platform:latest
             docker-compose -f /path/to/docker-compose.yml up -d
             EOF

         - name: Run database migrations
           run: |
             ssh -o StrictHostKeyChecking=no ${{ secrets.STAGING_USER }}@${{ secrets.STAGING_HOST }} << 'EOF'
             docker-compose -f /path/to/docker-compose.yml run backend npm run migrate
             EOF
   ```

### Using Environment Secrets

1. In your GitHub repository, navigate to `Settings` > `Secrets` > `Actions`.

2. Add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username.
   - `DOCKER_PASSWORD`: Your Docker Hub password.
   - `SSH_PRIVATE_KEY`: The private key for SSH access to your staging server.
   - `STAGING_USER`: The username for SSH access to your staging server.
   - `STAGING_HOST`: The hostname or IP address of your staging server.

3. These secrets will be used in the GitHub Actions workflow to securely access sensitive information.

### Environment Setup Guide

1. Clone the repository:
   ```sh
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     DATABASE_URL=your_database_url
     REDIS_URL=your_redis_url
     ```

### API Documentation

The API documentation is available at [API Documentation](http://localhost:3000/api-docs).

### Testing Instructions

1. Navigate to the backend application directory:
   ```sh
   cd apps/backend
   ```

2. Run the tests:
   ```sh
   npm run test
   ```

### Deployment Checklist

1. Ensure all tests pass:
   ```sh
   npm run test
   ```

2. Build the Docker images:
   ```sh
   docker-compose build
   ```

3. Push the Docker images to the registry:
   ```sh
   docker-compose push
   ```

4. Deploy the application:
   ```sh
   docker-compose up -d
   ```

5. Run database migrations:
   ```sh
   docker-compose run backend npm run migrate
   ```
