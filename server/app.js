const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require("fs");
const timeTableJson = JSON.parse(fs.readFileSync('./json/fullTimetable.json'));
const timeTableInfoJson = JSON.parse(fs.readFileSync('./json/timetableInfo.json'));
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

app.get('/getTimetableInfoSchema',(req,res)=>{
    try{
        
        schema = timeTableInfoJson;
        res.json({ schema });

    } catch (err) {
        var err = new Error('Not found');
        err.status = 404;
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
app.post('/getSchedule', (req, res) => {
    let subjects = timeTableJson.filter(obj => obj.subject == req.body.subject_id && obj.catalog_nbr == req.body.course_code
        && obj.course_info[0].ssr_component == req.body.component_id)

    try {
        res.json(subjects);
    } catch (err) {
        res.json({ message: err });
    }
});


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