const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const recipeLikeRoutes = require('./routes/recipeLikeRoutes');
const recipeApiRoutes = require('./routes/recipeExrternalAPIRoutes');


dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());

connectDB().then(r => (r));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeLikeRoutes);
app.use('/api/recipes', recipeApiRoutes);


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});