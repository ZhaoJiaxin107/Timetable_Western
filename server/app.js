const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require("fs");
const timeTableJson = JSON.parse(fs.readFileSync('./json/fullTimetable.json'));
const timeTableInfoJson = JSON.parse(fs.readFileSync('./json/timetableInfo.json'));
require('dotenv/config');
app.use(bodyParser.json());


app.get('/getTimetableSchema', (req, res) => {
    try {

        schema = timeTableInfoJson;
        res.json({ schema });

    } catch (err) {
        var err = new Error('Not found');
        err.status = 404;
        res.json({ message: err });
    }
});

app.get('/getCourseCode/:subject_id', function (req, res) {
    let course = timeTableJson.filter(course => course.subject === req.params.subject_id)
        .map(({ catalog_nbr, className }) => ({
            course_code_id: catalog_nbr,
            description: className
        }));

    if (course != '') {
        res.json({ course_codes: course });
    }
    else {
        res.json({
            status: 400,
            response: 'Bad Request',
            message: `The ${req.params.subject_id} is unavailable`
        });
    }
})

app.post('/getSchedule', (req, res) => {
    var defSubjects = [];
    var defCampus = [];
    var defComponent = [];
    for (var i = 1; i < timeTableInfoJson.subject.length; i++) {
        defSubjects.push(timeTableInfoJson.subject[i].subject_id);
    }
    for (var i = 1; i < timeTableInfoJson.Campus.length; i++) {
        defCampus.push(timeTableInfoJson.Campus[i].Campus_value.replace("'", ""));
    }
    for (var i = 1; i < timeTableInfoJson.Component.length; i++) {
        defComponent.push(timeTableInfoJson.Component[i].Component_id);
    }

    const defaults = {
        subject: defSubjects,
        start_time: timeTableInfoJson.start_time,
        end_time: timeTableInfoJson.end_time,
        campus: defCampus,
        days: timeTableInfoJson.day,
        // delivery_type: "LEC";
        component: defComponent,
        enrl_stat: "Not full"
    }

    let filters = Object.assign({}, defaults, req.body);
    let checker = (arr, target) => target.some(v => arr.includes(v));

    let subjectsResp = timeTableJson.filter(obj => checker(obj.course_info[0].days, filters.days)
        &&
        filters.subject.includes(obj.subject) &&
        filters.start_time.includes(obj.course_info[0].start_time.toLowerCase()) &&
        filters.end_time.includes(obj.course_info[0].end_time.toLowerCase()) &&
        filters.campus.includes(obj.course_info[0].campus) &&
        filters.component.includes(obj.course_info[0].ssr_component) &&
        filters.enrl_stat.includes(obj.course_info[0].enrl_stat)
    )
    let response = {
        length: subjectsResp.length,
        result: subjectsResp
    }

    try {
        res.json({ response });
    } catch (err) {
        res.json({ message: err });
    }
});

app.get('/getCourseCode/:subject_id', function (req, res) {
    let course = timeTableJson.filter(course => course.subject === req.params.subject_id)
        .map(({ catalog_nbr, className }) => ({
            course_code_id: catalog_nbr,
            description: className
        }));

    if (course != '') {
        res.json({ course_codes: course });
    }
    else {
        res.json({
            status: 400,
            response: 'Bad Request',
            message: `The ${req.params.subject_id} is unavailable`
        });
    }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    console.log(req.body);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
