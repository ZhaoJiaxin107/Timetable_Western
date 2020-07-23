const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require("fs");
const timeTableJson = JSON.parse(fs.readFileSync('./json/fullTimetable.json'));
require('dotenv/config');

//MIDDLEWARES
// app.use(cors());
app.use(bodyParser.json());

//app.use(express.static('public'));

app.get('/getTimetableSchema', (req, res) => {
    let subjects = [...new Set(timeTableJson.map(obj => {
        return { 'subject': obj.subject, 'className': obj.className }
    }
    ))]
    res.json({ subjects });
});

app.post('/getSchedule', (req, res) => {
    const defaults = {
        subject: "ACTURSCI",
        start_time: ["8:00 am", "8:30 am", "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm" ],
        end_time: ["9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30pm", "8:00pm", "8:30pm", "9:00pm", "9:30pm", "10:00pm" ],
        campus: ["Main","Huron","Kings","Brescia"],
        days: [
              "M",
              "Tu",
              "W",
              "Th",
              "F"
            ],
       // delivery_type: "LEC";
        component:["LEC","LAB","TUT"],
        enrl_stat: "Not full"
    }
     let filters= Object.assign({}, defaults, req.body);
     let checker = (arr, target) => target.some(v => arr.includes(v));

    let subjectsResp = timeTableJson.filter(obj => checker(obj.course_info[0].days, filters.days)
    && obj.subject == filters.subject_id && 
    filters.start_time.includes(obj.course_info[0].start_time.toLowerCase()) &&
    filters.end_time.includes(obj.course_info[0].end_time.toLowerCase()) &&
    filters.campus.includes(obj.course_info[0].campus)&&
    filters.enrl_stat.includes(obj.course_info[0].enrl_stat)
     )
    try {
        res.json(subjectsResp);
    } catch (err) {
        res.json({ message: err });
    }
});

app.get('/getCourseCode/:subject_id',function(req,res){
    let course= timeTableJson.filter(course => course.subject === req.params.subject_id)
    .map(({catalog_nbr,className})=>({
            course_code_id:catalog_nbr,
            description:className
    }));
    
    if(course!=''){
        res.json({course_codes:course});
    }
    else{
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
