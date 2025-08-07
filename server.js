require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const companyRoutes = require('./routes/companyRoutes');


const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/uploads', express.static("uploads"));
app.use('/api', companyRoutes);
app.use('/auth', authRoutes);

mongoose.connect(DB_URL)
.then(()=> console.log("DB connected"))
.catch((error) => console.log("connection error",error))


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});