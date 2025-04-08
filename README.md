# Feedback Management System

A full-stack web application for collecting and managing user feedback, built with React, TypeScript, Node.js,Express and MongoDB.

# Live : https://feedback-collectorrr.netlify.app/

## Project Structure

```
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── api/             # API client configuration
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
├── backend/                # Node.js Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   └── index.js       # Entry point
│   └── package.json       # Backend dependencies
```

## Features

- **User Feedback Collection**
  - Form validation using Zod
  - Real-time feedback submission
  - Success notifications

- **Admin Dashboard**
  - View all feedback submissions
  - Filter and sort feedback
  - Update feedback status
  - Delete feedback entries

- **Responsive Design**
  - Mobile-friendly interface
  - Tailwind CSS styling
  - Smooth animations

- **Security**
  - Input validation
  - CORS protection
  - Environment variable configuration

## Tech Stack

### Frontend
- React 19
- TypeScript
- TailwindCSS
- React Router DOM
- React Hook Form
- Zod
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- CORS
- dotenv

## Setup Instructions

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB (v6.0 or higher)
- Git

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB URI and other configurations:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback_db
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

3. Start the frontend development server:
```bash
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

### Feedback Routes
- `GET /api/feedback` - Get all feedback entries
- `POST /api/feedback` - Submit new feedback
- `PATCH /api/feedback/:id/status` - Update feedback status
- `DELETE /api/feedback/:id` - Delete feedback

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Atul Kumar
- GitHub: [@atulkumar-20](https://github.com/atulkumar-20)
