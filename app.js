const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose, db } = require('./database/mongoose');
const {authenticateJWT} = require('./auth/auth');
const PORT = 8080;


// Route Declaration
const userRoutes = require('./routes/UserRoutes');
const taskRoutes = require('./routes/TaskRoutes');

const app = express();

// Basic API Configuration
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "templates")));
app.use("./templates/images", express.static(__dirname + "/templates/images"));



// Use Routes
//app.use('/user', authenticateJWT, userRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.get("/", (req, res) => {
  res.sendFile("templates/index.html", { root: __dirname });
  });
  
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});