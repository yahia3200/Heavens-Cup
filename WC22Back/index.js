const express = require('express');
const app = express();

const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const userRoute = require('./routes/auth');

dotenv.config();

//(To-Do)Connect to database

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});