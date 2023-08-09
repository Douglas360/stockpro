import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { config } from 'dotenv';
import cors from 'cors';
import { router } from './routes';
import prismaClient from './prisma';
import bodyParser from 'body-parser';

config();

const app = express();

// Add this middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'Error') {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: err.message,
    });
});

app.listen(3001, async () => {
    console.log('Rodando na porta 3001');

    try {
        // Try the database connection
        await prismaClient.$connect();
        console.log('Conectado ao banco de dados');
    } catch (error) {
        console.error('Falha na conexão com o banco de dados:', error);

    }
});
