import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video.js';
import User from './models/User.js';
import { videosData } from './data/videosData.js';

dotenv.config();

// Dummy user data
const users = [
    {
        username: 'Codevolution',
        email: 'codevolution@example.com',
        password: 'password123',
        profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
        username: 'Traversy Media',
        email: 'traversy@example.com',
        password: 'password123',
        profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
    },
    {
        username: 'Academind',
        email: 'academind@example.com',
        password: 'password123',
        profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135823.png',
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding');

        // Clear existing data from both collections
        await Video.deleteMany({});
        await User.deleteMany({});
        console.log('Existing data cleared.');

        // Insert dummy users and get their IDs
        const createdUsers = await User.insertMany(users);
        const userIds = createdUsers.map(user => user._id);
        const dummyUser = userIds[0]; // Use one user for all comments for simplicity
        console.log('Users seeded successfully');

        // Prepare video data with all required properties and comments
        const videosWithFullData = videosData.map(video => {
            return {
                ...video,
                // Assign a random user from the seeded users
                userId: userIds[Math.floor(Math.random() * userIds.length)],
                // Add dummy data for required fields
                views: Math.floor(Math.random() * 200000) + 10000,
                duration: "15:00", // Placeholder for duration
                uploadedTime: `${Math.floor(Math.random() * 12) + 1} months ago`, // Placeholder for time
                // Add dummy comments
                comments: [
                    {
                        userId: dummyUser,
                        comment: "This is a great video! 👏",
                    },
                    {
                        userId: dummyUser,
                        comment: "Awesome content, keep it up!",
                    },
                ]
            };
        });

        // Insert the new videos
        await Video.insertMany(videosWithFullData);
        console.log(`Database seeded with ${videosWithFullData.length} videos and comments!`);

    } catch (err) {
        console.error(`Error during seeding: ${err.message}`);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedDB();