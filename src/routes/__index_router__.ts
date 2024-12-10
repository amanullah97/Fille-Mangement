import { Router } from 'express';
import { fileRouter } from './file.routes';

export const indexRouter = Router();

//Index all the routes here.
indexRouter.use('/files', fileRouter);

indexRouter.use('/', (req, res) => {
    res.send('Hello, From API Route');
});
