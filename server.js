const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registration_form', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User model
const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.save()
        .then(() => res.send('User registered successfully!'))
        .catch(err => res.status(400).send('Error: ' + err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
