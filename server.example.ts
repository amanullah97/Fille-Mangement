
"use strict";
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Setup multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store files
    },
    filename: (req, file, cb) => {
        const uniqueName = uuid() + path.extname(file.originalname);
        cb(null, uniqueName); // Use a unique filename
    }
});

const upload = multer({ storage: storage });

// Middleware for parsing JSON
app.use(express.json());

// Ensure 'uploads' directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// CRUD Routes for File Operations

// Create: Upload a file
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        message: 'File uploaded successfully!',
        file: req.file
    });
});

// Read: Get a file (by filename)
app.get('/files/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    fs.stat(filePath, (err, stat) => {
        if (err || !stat) {
            return res.status(404).send('File not found');
        }

        res.sendFile(filePath);
    });
});

// Delete: Delete a file (by filename)
app.delete('/files/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.send('File deleted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
