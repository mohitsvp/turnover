# ECOMMERCE Web Application

This project is a web application for an E-commerce platform. It is built using Next.js, a popular React framework, and uses TypeScript for static typing. The application also uses tRPC for type-safe APIs and Prisma as an ORM for database management.

## Features

- User Authentication: Users can register, login, and verify their email.
- User Interests: Users can mark their interests.
- Navigation: A navigation bar is present for easy access to different sections of the website.

## Project Structure

The project is structured into several directories:

- `src/app`: Contains the main application code, including components and pages.
- [src/server](file:///Users/mohitsinghal/others/interviews/turnover/src/server/api/trpc.ts#70%2C6-70%2C6): Contains the server-side code, including the database and API definitions.
- `src/styles`: Contains global CSS styles.
- `src/utils`: Contains utility functions, such as for hashing passwords and sending emails.

## Running the Project

To run the project, you need to have Node.js and npm installed. Then, you can install the project dependencies and start the development server:

### Step 1

```bash
npm install
```

### Step 2

Use `.env.example` as reference and create a `.env` file updating all those values there

### Step 3

Run the following commands

```bash
npx prisma migrate dev
npx prisma db push
npx prisma generate
```

### Step 4

Run the command to add categories in db
```bash
npm run seed
```

### Step 5

To start the server run the following command

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.