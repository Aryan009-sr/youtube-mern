YouTube Clone (MERN Stack)

Watch the demo here: "https://youtu.be/-qp3R4Rhg4E"

A full-stack YouTube clone built with the MERN stack. Users can sign up, log in, create their own channel, upload videos, search for content, and interact with videos through comments.

🚀 Features

🔐 Authentication: JWT-based login & signup.

📺 Video Management: Create, update, and delete videos from the channel page.

💬 Comments CRUD: Add, edit, and delete comments on videos.

🔍 Search Functionality: Search videos by title.

🖥️ Responsive UI: Sidebar toggling, profile menu, and filters.

🎨 User Channels: Create and manage channels with customization.

🛠️ Technologies

Frontend: React, React Router, Axios

Backend: Node.js, Express.js

Database: MongoDB (Compass / Atlas)

Authentication: JWT (JSON Web Tokens)

Version Control: Git

📂 Project Structure
/youtube-clone
  ├── /backend   # Express + MongoDB API
  ├── /frontend  # React (Vite) app
  ├── .env       # Environment variables
  └── README.md

⚙️ Setup Instructions
1️⃣ Clone the repository

https://github.com/Aryan009-sr/youtube-mern.git
cd youtube-clone

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file in the root folder with the following content:

# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/youtube-clone-mern

# Backend server port
PORT=5000

# JWT secret key
JWT_SECRET=secretkey

# API base URL for frontend (React)
VITE_API_URL=http://localhost:5000/api


⚠️ Keep your JWT_SECRET safe and never commit your real .env to GitHub.

4️⃣ Run the project
npm run dev

****************
This same command will work for both frontend and backend.
As the video data is being managed locally using mongoDB compass.
You can test this by logging in using :

[login username: mainuser@gmail.com]
[login password: pass@123] 

I have done this to make CRUD Operation on channel videos easy.
This user will have some preseeded videos to check CRUD functionality.
If you register with the new user you have to run the command 
"npm run seed" to fetch some test videos for new user.
********************


Backend runs on: http://localhost:5000

Frontend runs on: http://localhost:5173 (Vite default)

📸 Screenshots
Backend/screenshots:

Login Page

Signup Page

Homepage

Video Player Page

Channel Page

🔮 Future Improvements

Video upload with file storage (Cloudinary/AWS S3). ( will surely implement this.)

Subscriptions and notifications.

Real-time chat/live streaming.

👨‍💻 Project by Prakhar Ajay Singh, Developed with ❤️ using the MERN stack.