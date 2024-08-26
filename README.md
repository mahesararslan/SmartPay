# SmartPay

SmartPay is a full-stack application built using Next.js and Turborepo that enables users to manage their finances by transferring money from their bank accounts to their SmartPay accounts, making peer-to-peer (P2P) transactions, and viewing transaction history. The project also includes a merchant dashboard that allows merchants to view data and update their profiles.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### User App

- **Credential Authentication**: Secure login using NextAuth with custom credentials.
- **On Ramp Transactions**: Transfer money from a bank account to a SmartPay account. The transaction is processed by a webhook server that updates the balance and transaction status.
- **P2P Transactions**: Make peer-to-peer transactions using Prisma for database operations.
- **Transaction History**: View all past transactions.
- **Profile Management**: Update user profile information.

### Merchant App

- **Google Sign-In**: Authentication using Google via NextAuth.
- **Dashboard**: View important data and statistics.
- **Profile Management**: Update merchant profile information.

## Tech Stack

### Frontend

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Prisma**: Next-generation ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Robust, high-performance relational database.
- **Zod**: TypeScript-first schema declaration and validation library.
- **TypeScript**: Strongly typed programming language that builds on JavaScript, used across both frontend and backend for type safety and improved developer experience.

### Monorepo Management

- **Turborepo**: Used to manage multiple applications (User App, Merchant App, Webhook Server) in a single repository. It speeds up builds and improves project structure.

## Installation

To get started with the SmartPay project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mahesararslan/SmartPay.git
    ```

    cd SmartPay

    In Root folder

    ```bash
   npm install
    ```
    -**Copy the .env.example files to .env in each relevant directory.**
    -**Replace the placeholder values in the .env files with your own.**

    Run this command in Root folder
    ```bash
   npm run dev
    ```

    
