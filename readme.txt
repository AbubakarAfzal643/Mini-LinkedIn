# 💼 Mini-LinkedIn Clone

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-%23FD366E.svg?style=for-the-badge&logo=appwrite&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

A full-stack social blogging application inspired by the professional aesthetics of LinkedIn. Built with **React** for the frontend, **Appwrite** for the backend (Auth & Database), and **Redux Toolkit** for state management.


## ✨ Features

* **Authentication System**: Secure Signup, Login, and Logout functionality using Appwrite Auth.
* **Modern UI/UX**:
    * **"Royal Blue" Theme**: Custom color palette matching professional standards.
    * **Responsive Design**: Fully mobile-responsive layout with a sticky header and organized footer.
    * **Loading States**: Smooth loading spinners and transition effects.
* **Rich Text Editor**: Integrated **TinyMCE** for creating formatted posts (bold, italics, lists, etc.).
* **Image Handling**: Upload, preview, and store post thumbnails using Appwrite Storage (Buckets).
* **State Management**: Centralized data flow using **Redux Toolkit** for authentication status and user data.
* **Security**: Protected routes (`AuthLayout`) ensuring only logged-in users can add or edit posts.

## 🛠️ Tech Stack

* **Frontend**: React.js (Vite)
* **Styling**: Tailwind CSS
* **State Management**: Redux Toolkit & React-Redux
* **Backend as a Service**: Appwrite (Auth, Databases, Storage)
* **Forms**: React Hook Form
* **Routing**: React Router DOM
* **Editor**: TinyMCE

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

* Node.js installed (v16+ recommended)
* An Appwrite account and a created project

### 1. Clone the Repository

```bash
git clone https://github.com/AbubakarAfzal643/mini-linkedin.git
cd mini-linkedin
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your Appwrite credentials.

```env
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
```
Note: Make sure you have created the Database, Collection, and Storage Bucket in your Appwrite console and set the permissions (Read/Write) correctly.

### 4. Run the project

```bash
npm run dev
```


### 📂 Project Structure

```text
src/
├── appwrite/       # Appwrite service configuration (Auth, DB, Bucket)
├── components/     # Reusable UI components (Header, Footer, Button, Input, etc.)
├── conf/           # Environment variable wrappers
├── pages/          # Main page views (Home, Login, Signup, AllPosts, etc.)
├── store/          # Redux store and slices
├── App.jsx         # Main Layout wrapper
└── main.jsx        # Entry point and Router configuration
```

Developed by Abubakar Afzal





