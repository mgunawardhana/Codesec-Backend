const mongoose = require('mongoose');

const connectDB = async () => {
    
    // eslint-disable-next-line no-undef
    const dbURI = process.env.MONGODB_URI;
    
    
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        console.info('Connected to DB');
    } catch (e) {
        console.error(e);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

module.exports = connectDB;