import mongoose from 'mongoose';
import env from '../config/env';

class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(`${env.mongoUrl}`, {});
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }
}

export default MongoConnection;
