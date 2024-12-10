import multer from 'multer';

const storage = multer.memoryStorage(); // Stores file in memory as a Buffer

export const upload = multer({
    dest: 'uploads/', // Save file to disk
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
});
