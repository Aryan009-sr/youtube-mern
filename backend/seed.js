import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video.js';
import User from './models/User.js';
import { videosData } from './data/videosData.js';

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding');

        // Clear existing videos
        await Video.deleteMany({});
        console.log('Existing videos cleared.');

        // Fetch existing users
        let existingUsers = await User.find();

        // If no users exist, create temporary dummy users
        if (existingUsers.length === 0) {
            const dummyUsers = [
                { username: 'TempUser1', email: 'temp1@example.com', password: 'password123' },
                { username: 'TempUser2', email: 'temp2@example.com', password: 'password123' },
            ];
            const createdUsers = await User.insertMany(dummyUsers);
            existingUsers = createdUsers;
            console.log('Temporary dummy users created for seeding videos.');
        }

        const userIds = existingUsers.map(user => user._id);

        // Prepare video data
        const videosWithFullData = videosData.map(video => ({
            ...video,
            userId: userIds[Math.floor(Math.random() * userIds.length)],
            views: Math.floor(Math.random() * 200000) + 10000,
            duration: '15:00',
            uploadedTime: `${Math.floor(Math.random() * 12) + 1} months ago`,
        }));

        // Insert videos
        await Video.insertMany(videosWithFullData);
        console.log(`Database seeded with ${videosWithFullData.length} videos!`);

    } catch (err) {
        console.error(`Error during seeding: ${err.message}`);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedDB();
