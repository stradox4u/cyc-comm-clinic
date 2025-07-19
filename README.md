# cyc-comm-clinic
Community Health Clinic App for Team Umar (CYC 2025 Cohort 2)

## Setup Instructions
- Make sure you have Docker/Docker Desktop installed on your machine.
- Clone the repository into a folder on your machine.
- Navigate to the project directory.
- Navigate into the `client-app` directory, and run `npm install` to install the client app dependencies locally.
- Navigate into the `server-app` directory, and run `npm install` to install the server app dependencies locally.
- Copy the `.env.sample` file to `.env` and fill in the required environment variables.
- In the `.env` file, set the `DB_USER` to `postgres`, `DB_PASSWORD` to a strong password of your choice, and `DB_NAME` to `comm_clinic_data`.
- Run `docker compose build` to build the Docker images (this needs to be redone if dependencies are added/removed).
- Run `docker compose up` to start the application.
- The client app will be available at `http://localhost:5173`.
- The server app will be available at `http://localhost:8000`.
- If adding/removing dependencies, make sure to run `docker compose down`, followed by `docker compose build`, and then `docker compose up` again to ensure the changes are reflected.


- To seed the database, run `npm run db:reset && npm run db:seed`. Go to the seed script in prisma directory to know the custom credentials to test with.