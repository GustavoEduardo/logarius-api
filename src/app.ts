import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

/**
 * global middlewares
 */
app.use(cors());
app.use(express.json({limit: '200mb'}));

/**
 * routes
 */
app.use('', routes);

/**
 * static files route
 */
app.use(express.static("static"));

export default app; 