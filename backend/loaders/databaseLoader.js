import mongoose from 'mongoose';

export default async function databaseLoader(config) {
    await mongoose.connect(config.url);
}