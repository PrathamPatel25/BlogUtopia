# BlogUtopia

## Live Demo

Explore BlogUtopia live:  
🔗 **[BlogUtopia Live Demo](https://blog-utopia.vercel.app/)**

---

## Table of Contents

- [BlogUtopia](#blogutopia)
  - [Live Demo](#live-demo)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend:](#frontend)
    - [Backend:](#backend)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Configure Environment Variables](#configure-environment-variables)
    - [Run the Application](#run-the-application)
  - [Environment Variables](#environment-variables)
  - [Contact](#contact)

---

## Overview

**BlogUtopia** is a dynamic blogging platform that allows users to create, read, update, and delete blogs. Built with React and powered by Appwrite for backend services, BlogUtopia offers an interactive and seamless experience for content creators and readers.

---

## Features

- **Rich Text Editor**: Create and format blogs using React Quill.
- **Responsive Design**: Optimized for all screen sizes using Tailwind CSS.
- **State Management**: Powered by Redux Toolkit.
- **Interactive Animations**: Enhanced user experience with GSAP.
- **3D Elements**: Integrated 3D visualizations with Spline.
- **User Authentication**: Secured login and signup functionalities powered by Appwrite.
- **Form Validation**: Simplified with React Hook Form.
- **Dynamic Routing**: Managed by React Router.

---

## Tech Stack

### Frontend:

- **React.js**
- **React Router DOM**
- **Redux Toolkit**
- **Tailwind CSS**
- **React Quill**
- **GSAP (GreenSock Animation Platform)**
- **Spline**

### Backend:

- **Appwrite**: For authentication, database, and storage.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/PrathamPatel25/BlogUtopia.git
cd BlogUtopia
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables. See [Environment Variables](#environment-variables) for details.

### Run the Application

Start the development server:

```bash
npm run dev
```

Access the app at `http://localhost:3000`.

---

## Environment Variables

In the root directory, create a `.env` file and configure the following variables:

```env
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
VITE_APPWRITE_BUCKET_ID=your_appwrite_bucket_id
```

---

## Contact

For any queries or feedback, please reach out:

- **Email**: prathampatel5044@gmail.com
- **LinkedIn**: [Profile](https://www.linkedin.com/in/pratham-patel-0920-/)
