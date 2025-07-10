# cyc-comm-clinic
Community Health Clinic App for Team Umar (CYC 2025 Cohort 2)

## Setup Instructions
- Make sure you have Docker/Docker Desktop installed on your machine.
- Clone the repository into a folder on your machine.
- Navigate to the project directory.
- Navigate into the `client-app` directory, and run `npm install` to install the client app dependencies locally.
- Navigate into the `server-app` directory, and run `npm install` to install the server app dependencies locally.
- Run `docker compose build` to build the Docker images (this needs to be redone if dependencies are added/removed).
- Run `docker compose up` to start the application.
- The client app will be available at `http://localhost:5173`.
- The server app will be available at `http://localhost:8000`.
