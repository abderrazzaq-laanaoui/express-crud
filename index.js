const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const authenticator = require('./authenticator');
const courses = require('./courses');
const Joi = require('joi');
//LOG FILE
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const app = express();
app.use(morgan('combined', { skip: (req, res) => res.statusCode < 400, stream: accessLogStream }))

console.log(`NODE_ENV: ${app.get('env')}`);
app.use(express.json());
app.use(logger);
app.use(authenticator);
app.use(helmet());

app.get('/', (req, res) => {
    res.send('hello world!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses.getCourses())
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.getCourse(parseInt(req.params.id));

    if (!course) return res.status(404).send("No course with given id was found!")
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    let { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let course = courses.addCourse(req.body.name, parseInt(req.body.viewers))
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    let { error } = validateRequest(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    if (!courses.getCourse(parseInt(req.params.id)))
        return res.status(404).send("No course with given id was found!");
    let course = courses.editCourse(parseInt(req.params.id), req.body.name, req.body.viewers);
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    if (!courses.getCourse(parseInt(req.params.id))) return res.status(404).send("No course with given id was found!");
    res.send(courses.deleteCourse(parseInt(req.params.id)));
})

const port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})

function validateRequest(body) {
    let courseSchema = Joi.object({
        name: Joi.string().min(3).required(),
        viewers: Joi.number().min(0).required()
    });
    return courseSchema.validate(body);
}