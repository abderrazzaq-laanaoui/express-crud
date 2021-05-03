const express = require('express');
const courses = require('../services/courses.service')
const router = express.Router();

router.get('/', (req, res) => {
    res.send(courses.getCourses())
})

router.get('/:id', (req, res) => {
    const course = courses.getCourse(parseInt(req.params.id));

    if (!course) return res.status(404).send("No course with given id was found!")
    res.send(course);
})

router.post('/', (req, res) => {
    let { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let course = courses.addCourse(req.body.name, parseInt(req.body.viewers))
    res.send(course);
})

router.put('/:id', (req, res) => {
    let { error } = validateRequest(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    if (!courses.getCourse(parseInt(req.params.id)))
        return res.status(404).send("No course with given id was found!");
    let course = courses.editCourse(parseInt(req.params.id), req.body.name, req.body.viewers);
    res.send(course);
})

router.delete('/:id', (req, res) => {
    if (!courses.getCourse(parseInt(req.params.id))) return res.status(404).send("No course with given id was found!");
    res.send(courses.deleteCourse(parseInt(req.params.id)));
})

function validateRequest(body) {
    let courseSchema = Joi.object({
        name: Joi.string().min(3).required(),
        viewers: Joi.number().min(0).required()
    });
    return courseSchema.validate(body);
}
module.exports = router;