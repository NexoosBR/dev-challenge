import express from 'express';

const app = express();

app.use(express.json());

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server listening on port: 3333'));
