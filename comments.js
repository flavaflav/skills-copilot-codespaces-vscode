// Create web server

// Import express
const express = require('express');
// Import body parser
const bodyParser = require('body-parser');
// Import cors
const cors = require('cors');
// Import mongoose
const mongoose = require('mongoose');

// Create express app
const app = express();

// Set port
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('MongoDB connect failed');
    });

// Import comment model
const Comment = require('./models/comment');

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Get all comments
app.get('/comments', (req, res) => {
    Comment.find()
        .then((comments) => {
            res.json(comments);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// Create new comment
app.post('/comments', (req, res) => {
    const newComment = new Comment({
        title: req.body.title,
        content: req.body.content,
    });

    newComment.save()
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// Update comment by id
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
    })
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// Delete comment by id
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json('Comment deleted');
        })
        .catch((