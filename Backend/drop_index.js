import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.mongo_uri;

async function dropIndex() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected.');
    
    // The collection name is 'users' based on user.schema.js
    const collectionName = 'users';
    
    console.log('Dropping confirmPassword_1 index...');
    await mongoose.connection.collection(collectionName).dropIndex('confirmPassword_1');
    console.log('Successfully dropped confirmPassword_1 index!');
    
    // Also drop password and mobileNumber indexes in case they are still lingering
    try {
        await mongoose.connection.collection(collectionName).dropIndex('password_1');
        console.log('Successfully dropped password_1 index!');
    } catch(e) { console.log('password_1 index not found or already dropped.'); }
    
    try {
        await mongoose.connection.collection(collectionName).dropIndex('mobileNumber_1');
        console.log('Successfully dropped mobileNumber_1 index!');
    } catch(e) { console.log('mobileNumber_1 index not found or already dropped.'); }
    
    process.exit(0);
  } catch (error) {
    console.error('Error dropping index:', error.message);
    process.exit(1);
  }
}

dropIndex();
