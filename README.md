# Open Task Manager | https://open-task-manager.vercel.app/

Open Task Manager is a task management system built with **Next.js**, **NextAuth**,**TanStack React Query** and **PostgreSQL**, designed to provide a secure and role-based platform for managing tasks across an organization.

---

## Features

- **Secure API Routes**: All API routes are protected to ensure data safety.
- **Role-Based System**: Supports three roles - `Admin`, `Manager`, and `User`.
- **Google Sign-In and Credentials Authentication**: Users can log in using Google or email credentials.
- **Real-Time Authentication**: Utilizes **TanStack React Query** to poll the database and verify user authenticity.

---

## Roles and Functionality

### 1. Admin
- Automatically assigned to the first user of the company.
- Access to all tasks created across the company.
- Manage employees:
  - View employee details.
  - Update roles and assign departments.

### 2. Manager
- Can view tasks created by users in the same department.
- Access the **Team** page:
  - View team members in the same department.
  - Remove team members as needed.

### 3. User
- Can view and manage their own tasks.
- Update the status of their tasks.

---

## Pages and Their Access

### 1. Dashboard
Accessible to all roles.
- **User**:
  - View tasks created by themselves.
  - Update task statuses.
- **Manager**:
  - View tasks created by users in the same department.
- **Admin**:
  - View all tasks created across the organization.

### 2. Employees
Visible only to **Admin**.
- View employees.
- Update roles and departments.

### 3. Team
Visible only to **Manager**.
- View team members in the same department.
- Remove team members.

---





## Notes to Evaluators

 Google Sign-In is restricted for certain accounts as the app has not been published. If you are unable to sign in using Google, please share your email address with me so I can add it to the Google Cloud Console.


## Project Setup

Follow these steps to set up and run the project locally:

### 1. Prerequisites
- **Node.js** (v16+ recommended)
- **PostgreSQL** (set up a database for the project)
- **Google Cloud Console account** (for Google Sign-In configuration)

### 2. Clone the Repository
```bash
git clone 
cd open-task-manager
```

### 3. Install Dependencies
Run the following command to install the required packages:

```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your-postgresql-database-url
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_URL=http://localhost:3000
```

### 5. Set Up the Database
Run migrations to set up the database schema:

```bash
npx prisma migrate dev --name init
```



### Generate the Prisma Client
Run the following command to generate the Prisma client:

```bash
npx prisma generate
```

### Run the Development Server
Start the development server:

```bash
npm run dev
```
Open http://localhost:3000 in your browser.

### Google Sign-In Video
Click the link below to watch the Google Sign-In demonstration:

[Google Sign-In Video](https://drive.google.com/file/d/1EO-b6LB144Uw8GbAYC0MKpN6zftdzK5A/view?usp=sharing)

![Project Screenshot](./assets/2.png)
![Project Screenshot](./assets/3.png)
![Project Screenshot](./assets/4.png)
![Project Screenshot](./assets/5.png)
![Project Screenshot](./assets/6.png)
![Project Screenshot](./assets/7.png)

