const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const DB = "fullstack";
const cookieParser= require('cookie-parser')

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
require('./routes/userRoute')(app)
require('dotenv').config();
require('./routes/routes')(app)
// Connect to MongoDB
require('./config/config.mongoose')(DB);

// Start the server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
