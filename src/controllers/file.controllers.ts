import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export const uploadFiles = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.files);

    if (!req.files) {
        res.status(400).send('No files uploaded');
        return;
    }

    const files = req.files as Express.Multer.File[];
    const uploadsPath = path.join(__dirname, '../../uploads');

    try {
        await Promise.all(files.map(file => {
            return new Promise((resolve, reject) => {
                const fileName = file.originalname;
                const fileStream = file.stream;

                // create a writable stream to save file to uploads folder
                const writeStream = fs.createWriteStream(path.join(uploadsPath, fileName));
                fileStream.pipe(writeStream);
                fileStream.on("data", (chunk) => {
                    console.log(`Received ${chunk.length} bytes`);
                })
                    .on("error", (err) => {
                        console.error(err);
                        reject('Error uploading file');
                    })
                    .on("end", () => {
                        console.log('File upload complete');
                        resolve(null);
                    });
            });
        }));

        res.status(200).send({
            message: 'Files uploaded successfully',
            count: files.length,
            files: files.map(file => file.originalname),
        });
    } catch (error) {
        res.status(500).send(error);
    }
};