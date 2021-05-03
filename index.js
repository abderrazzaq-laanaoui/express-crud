const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const pug = require('pug');
const logger = require('./middelwares/logger');
const authenticator = require('./middelwares/authenticator');
const courses = require('./services/courses.service');
const Joi = require('joi');
const config = require('config');

//routes
const coursesRouter = require('./routes/courses.router');
const indexRouter = require('./routes/index.router');
const app = express();

//LOG FILE
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) // create a write stream (in append mode)
app.use(morgan('combined', { skip: (req, res) => res.statusCode < 400, stream: accessLogStream }))

//GET DATE FROM CONFIG FILES:
console.log(`APPLICATION NAME: ${config.get('name')}`);
console.log(`MAIL HOST: ${config.get('mail.host')}`);
console.log(`MAIL PASSWORD: ${config.get('mail.password')}`); //the password was mapped from env varibale (express_mail_password=1234)

//GET ENVIRENMENT VARIABLES
console.log(`NODE_ENV: ${app.get('env')}`);

//MIDELWARES
app.use(express.json());
app.use(logger);
app.use(authenticator);
app.use(helmet());

//routers
app.use('/api/courses', coursesRouter);
app.use('/', indexRouter);

//----template engine-------//
app.set('view engine', 'pug');
app.set('views', './views'); // './views' is the default dir so need to mention it if we are not chnaging it


const port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})