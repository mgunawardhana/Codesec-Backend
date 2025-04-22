const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, age, password, phone, address, city, state, zip, country } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            age,
            password: hashedPassword,
            phone,
            address,
            city,
            state,
            zip,
            country,
        });

        await user.save();

        const payload = { userId: user._id };

        // const jwt_sec  = process.env.JWT_SECRET;

        const token = jwt.sign(payload, "7b9f2a8d5e4c1f6b3a9d8e7c2f5b4a1d9e8c7f3a2b6d5e4c1f9b8a7d3e2c6f5", { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { userId: user._id };

        // const jwt_sec  = process.env.JWT_SECRET;

        const token = jwt.sign(payload, "7b9f2a8d5e4c1f6b3a9d8e7c2f5b4a1d9e8c7f3a2b6d5e4c1f9b8a7d3e2c6f5", { expiresIn: '48h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};