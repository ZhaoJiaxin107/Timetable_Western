const companies= [
    {name: "Company One", category: "Finance", start: 1981, end: 2004},
    {name: "Company Two", category: "Retail", start: 1992, end: 2008},
    {name: "Company Three", category: "Auto", start: 1999, end: 2007},
    {name: "Company Four", category: "Retail", start: 1989, end: 2010},
    {name: "Company Five", category: "Technology", start: 2009, end: 2014},
    {name: "Company Six", category: "Finance", start: 1987, end: 2010},
    {name: "Company Seven", category: "Auto", start: 1986, end: 1996},
    {name: "Company Eight", category: "Technology", start: 2011, end: 2016},
    {name: "Company Nine", category: "Retail", start: 1981, end: 1989}
  ];
  
const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

//for each
/*for(let i=0;i<companies.length;i++){
    console.log(companies[i]);
}
companies.forEach(function(company){
    console.log(company);
});*/

//filter

/*let canDrink = [];
for(let i=0; i<ages.length;i++){
    if(ages[i] >= 21){
        canDrink.push(ages[i]);
    }
}


console.log(canDrink);*/

//filter

/*const canDrink = ages.filter(function(age){
    if(age >= 21){
        return true;
    }
});*/

const canDrink = ages.filter(age => age>= 21);
console.log(canDrink);

//Filter retailing companies
/*const retailCompanies = companies.filter(function(company){
    if(company.category === 'Retail'){
        return true;
    }
});
console.log(retailCompanies);*/

//Get 80s companies

/*const eightiesCompanies = companies.filter(company =>(company.start >=
    1980 && company.start < 1990));

console.log(eightiesCompanies);

// Get compamies that lasted 10 years or more

const lastedTenYears = companies.filter(company =>(company.end - 
    company.start > 10));

console.log(lastedTenYears);*/

//map

//create array of company names
/*const companyNames = companies.map(function(company){
    return company.name;
});
console.log(companyNames);*/

/*const testMap = companies.map(function(company){
    return `${company.name}[${company.start} - ${company.end}]`;
});
const testMap = companies.map(company => `${company.name} [${company.start}- ${company.end}]`);*/

//console.log(testMap);

const ageSquare =ages.map(age => Math.sqrt(age));
const ageTimesTwo = ages.map(age => age*2);

const ageMap = ages
    .map(age => Math.sqrt(age))
    .map(age => age * 2);
//console.log(ageTimesTwo);
console.log(ageMap);

//Object.assign() 方法用于将所有可枚举属性的值从
//一个或多个源对象复制到目标对象。它将返回目标对象。
/*const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }*/

/*
const， var， let的区别。
1.const定义的变量不可以修改，而且必须初始化。
2.var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
3.let是块级作用域，函数内部使用let定义后，对函数外部无影响。
*/

// Angular References
// https://www.youtube.com/watch?v=pTec1e8oyc8

/*1.API One: return the whole json file: timetableInfo.json
  2.https://www.youtube.com/watch?v=LmIsbzt-S_E
  3.https://www.youtube.com/watch?v=rdLJNGZvlAA
  4.https://www.youtube.com/watch?v=F5zdEx9lz2o
  5.https://www.youtube.com/watch?v=0uGipN4TRXs&list=&index=2
*/

/* Angular Tutorial
   npm i -g @angular/cli
   ng new AngularApp
   {
    "subject": "ACTURSCI",
    "start_time": "12:30 PM",
    "end_time": "1:30 PM",
    "campus":"Main",
    "days":["M","W","F"],
    "component":"LEC",
    "enrl_stat":"Not full"
}

https://www.youtube.com/watch?v=Il-o7GChUr8
https://www.youtube.com/watch?v=pTec1e8oyc8 前面介绍概念

https://www.youtube.com/watch?v=wtIvu085uU0&t=2425s  get

https://www.youtube.com/watch?v=6xlPAcFklO8
*/


