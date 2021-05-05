let courses = [
    { id: 1, name: "Complete Javascript developer", viewers: 11203 },
    { id: 2, name: "Complete JAVA developer", viewers: 4826 },
    { id: 3, name: "Complete HTML/CSS developer", viewers: 9461 },
    { id: 4, name: "Complete Python developer", viewers: 34424 },
    { id: 5, name: "Complete C# developer", viewers: 3513 }
]

let courseID = 6;

function getCourses() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(courses);
            // reject(new Error("Something goes wrong!"))
        }, 3000)
    })

}

function getCourse(id) {
    return courses.find((course) => course.id === id);

}

function addCourse(name, viewers) {
    let course = { id: courseID, name: name, viewers: viewers }
    courses.push(course);
    courseID += 1;
    return course;
}

function editCourse(id, name, viewers) {
    let course = courses.find(c => c.id === id);
    course.name = name;
    course.viewers = viewers;
    return course;
}

function deleteCourse(id) {
    let course = courses.find(c => c.id === id);
    let index = courses.indexOf(course);
    courses.splice(index, 1);
    return course;
}
exports.addCourse = addCourse;
exports.getCourses = getCourses;
exports.getCourse = getCourse;
exports.editCourse = editCourse;
exports.deleteCourse = deleteCourse;