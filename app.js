const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { mongoose, db } = require('./database/mongoose');
const {authenticateJWT} = require('./auth/auth');
const PORT = 8080;


// Route Declaration
const userRoutes = require('./routes/UserRoutes');


// Basic API Configuration
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());



// Use Routes
//app.use('/user', authenticateJWT, userRoutes);
app.use('/user', userRoutes);

app.get("/", (req, res) => {
    res.sendFile("templates/index.html", { root: __dirname });
  });
  
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});