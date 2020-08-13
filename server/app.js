const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require("fs");
const { match } = require('assert');
const { result, filter } = require('lodash');
require('dotenv/config');
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(function (req, res, next) {
    res.setHeader(
        'Access-Control-Allow-Origin', 'http://localhost:4200',
        'Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT",
        'Content-Type', 'application/json',
        'Access-Control-Allow-Headers',' Origin, Content-Type, X-Auth-Token',
        "HTTP/1.1 200 OK");
    next();
  });

const timeTableJson = JSON.parse(fs.readFileSync('./json/fullTimetable.json'));
const timeTableInfoJson = JSON.parse(fs.readFileSync('./json/timetableInfo.json'));

app.get('/timetable/getTimetableSchema', (req, res) => {
    try {
        res.json({ timeTableInfoJson });
    } catch (err) {
        res.json({ message: err });
    }
});

app.get('/timetable/getCourseCode/:subject_id', function (req, res) {
    let course = timeTableJson.filter(course => course.subject === req.params.subject_id)
        .map(({ catalog_nbr, className }) => ({
            course_code_id: catalog_nbr,
            description: className
        }));
    
    if (course.length > 0) {
        res.json(course);
    } else {
        res.json({
            status: 400,
            response: 'Bad Request',
            message: `The subject ${req.params.subject_id} is unavailable`
        });
    }
})


app.get('/timetable/getSchedule/:course_code', function (req, res) {
    var course_code = String(req.params.course_number);
    var reg = new RegExp(course_code);
    let course = timeTableJson.filter(course => course.catalog_nbr.match(reg));
    //console.log(course);
    try {
        res.json({ length: course.length,
                    result: course });
    } catch (err) {
        res.json({ message: err });
    }
})


app.post('/timetable/getScheduleCourseCode', function (req, res) {

    var course_code= req.body.course_number;
    console.log(course_code);
    var reg = new RegExp(course_code);
    let course = timeTableJson.filter(course => course.catalog_nbr.match(reg));
    //console.log(course);
    try {
        res.json({ length: course.length,
                    result: course });
    } catch (err) {
        res.json({ message: err });
    }
})


app.post('/timetable/getSchedule', (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    let defSubjects = []
    ,defCampus = []
    ,defComponent = [];
  
    for (let i = 1; i < timeTableInfoJson.subject.length; i++) {
        defSubjects.push(timeTableInfoJson.subject[i].subject_id);
    }
    for (let j = 1; j < timeTableInfoJson.Campus.length; j++) {
        defCampus.push(timeTableInfoJson.Campus[j].Campus_value.replace("'", ""));
    }
    for (let k = 1; k < timeTableInfoJson.Component.length; k++) {
        defComponent.push(timeTableInfoJson.Component[k].Component_id);
    }
    const defaults = {
        subject: defSubjects,
        start_time: timeTableInfoJson.start_time,
        end_time: timeTableInfoJson.end_time,
        campus: defCampus,
        days: timeTableInfoJson.day,
        // delivery_type: "LEC";
        component: defComponent,
        course_number:"",
        enrl_stat: "Not full"
    }

    let filters = Object.assign({}, defaults, req.body);
    let checker = (arr, target) => target.some(v => arr.includes(v));
    
    var course_code= req.body.course_number;
    console.log(course_code);
    var subject = req.body.subject;
   
    

    // search by course code
    if(course_code!="" && subject==""){
        var reg = new RegExp(course_code);
        let subjectsResp = timeTableJson.filter(obj => obj.catalog_nbr.match(reg));
        try {
            res.json({ length: subjectsResp.length,
                        result: subjectsResp });
        } catch (err) {
            res.json({ message: err });
        }
    }
    // search by all deault fields
    if(course_code == "" && subject!=""){
        let subjectsResp = timeTableJson.filter(obj => checker(obj.course_info[0].days, filters.days)
        &&
        obj.subject.indexOf(filters.subject)!==-1 &&
        obj.course_info[0].start_time.toLowerCase().indexOf(filters.start_time) !==-1 &&
        obj.course_info[0].end_time.toLowerCase().indexOf(filters.end_time)!==-1 &&
        obj.course_info[0].campus.indexOf(filters.campus)!==-1 &&
        obj.course_info[0].ssr_component.indexOf(filters.component)!==-1 &&
        obj.course_info[0].enrl_stat.indexOf(filters.enrl_stat)!==-1
    )
    try {
        res.json({ length: subjectsResp.length,
                    result: subjectsResp });
    } catch (err) {
        res.json({ message: err });
    }}
    // search by all fields and sunject and course_code must match
    if(subject!="" && course_code!=""){
        var reg = new RegExp(course_code);
        let subjectsResp = timeTableJson.filter(obj => obj.catalog_nbr.match(reg)
            && obj.subject == subject
        );
        try {
            res.json({ length: subjectsResp.length,
                        result: subjectsResp });
        } catch (err) {
            res.json({ message: err });
        }
    }
    // if select all subject
    if(subject=="" && course_code==""){
        if(filters.campus!=""){
        let subjectsResp = timeTableJson.filter(obj => checker(obj.course_info[0].days, filters.days)
        &&
        obj.course_info[0].start_time.toLowerCase().indexOf(filters.start_time) !==-1 &&
        obj.course_info[0].end_time.toLowerCase().indexOf(filters.end_time)!==-1 &&
        obj.course_info[0].ssr_component.indexOf(filters.component)!==-1 &&
        obj.course_info[0].campus == filters.campus
        )
        try {
            res.json({ length: subjectsResp.length,
                        result: subjectsResp });
        } catch (err) {
            res.json({ message: err });
        }
        }
        else{
        subjectsResp = timeTableJson.filter(obj => checker(obj.course_info[0].days, filters.days)
        &&
        obj.course_info[0].start_time.toLowerCase().indexOf(filters.start_time) !==-1 &&
        obj.course_info[0].end_time.toLowerCase().indexOf(filters.end_time)!==-1 &&
        obj.course_info[0].ssr_component.indexOf(filters.component)!==-1)
        }
        try {
            res.json({ length: subjectsResp.length,
                        result: subjectsResp });
        } catch (err) {
            res.json({ message: err });
        }
    }
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