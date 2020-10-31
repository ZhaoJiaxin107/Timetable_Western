# Timetable For Western University
Timetable for Western University by using Node.js and Angular

### Overview

The objective of this project is to find relevant timetable information by selecting keywords such as subject, component, campus, days, start time, end time, course suffix 
and or even search by entering course number. What we need to complete is the design and mock of the back-end REST APIs and the construction the web page using popular 
front-end framework. Main technologies we are using is Node.js for back-end and Angular/React for front-end. All the course information is stored in JSON format which is
provided by WTS department. If this project finish successfully, each teacher and student in Western University can search timetable and relevant courses for them 
conveniently online. It is an good interface to let students compare courses with other schools as well.

### Installation Guide
The back-end code for running this project can be installed from my github repository by using the following command in your local github repository:
git clone https://github.com/ZhaoJiaxin107/Timetable_Western.git Jiaxin Branch, not master branch because we have changed the previous API designed before.

This repository consists of the back-end code and JSON file. The user can follow the instructions in this report to setup the back-end and server on their own system. The user should make sure to install all the dependencies before running the server as discussed in this report before. 

The front-end code for running this project on your local computer can also be installed from my github repository by using the following command in your local github repository:
git clone https://github.com/ZhaoJiaxin107/Timetable_Western.git Jiaxin Branch, not master branch because Yiyun and I use Angular to implement the front-end.

In order to run this code make sure you have installed node.js and Angular CLI on your system. Also, when running this application, please make sure back-end port is listening by entering nodemon/node server.js in terminal and front-end is running by entering ng serve in terminal. Finally, open your browser and enter localhost:4200. Preferably use Google Chrome. What should be noted is that every time you search for a new course, the page should be turned into the first page.  

When you download this repository from github there may be something wrong when you are running it. There are three things needed to be installed in terminal.

1.Server side: npm i express 

2.Client side: npm i -g @angular/cli
               npm i --save-dev @angular-devkit/core

### Result for western timetable
#### 1.Index Page
![Image text](https://github.com/ZhaoJiaxin107/Timetable_Western/blob/main/IndexPage.png)
#### 2.SearchPanel
![Image text](https://github.com/ZhaoJiaxin107/Timetable_Western/blob/main/SearchPanel.png)
#### 3.ResultPanel
![Image text](https://github.com/ZhaoJiaxin107/Timetable_Western/blob/main/ResultPanel.png)
#### 4.Pagination
![Image text](https://github.com/ZhaoJiaxin107/Timetable_Western/blob/main/Pagination.png)
#### 5.Filter By Class Name
![Image text](https://github.com/ZhaoJiaxin107/Timetable_Western/blob/main/Filter.png)
