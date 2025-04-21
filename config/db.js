const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // eslint-disable-next-line no-undef
        await mongoose.connect("mongodb+srv://mrgunawardhana27368:Jb4G1jehMHXWPBLI@cluster0.cwae7cc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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