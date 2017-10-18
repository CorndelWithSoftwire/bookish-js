import ApiRouter from './routers/apiRouter';
import AuthenticationRouter from './routers/authenticationRouter';

import express from 'express';

const app = express();

app.use('/', AuthenticationRouter);
app.use('/', ApiRouter);

app.listen(3000, () => console.log('\nBookish listening on port 3000'));