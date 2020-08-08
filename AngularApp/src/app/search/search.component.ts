import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../http.service';
import { TimeTable } from '../timetableSchema';
import { Result } from '../result';
import { Search } from '../search';
import { NgForm, FormControl,FormBuilder,Validators,FormGroup,FormArray } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { throwError } from 'rxjs';
import { courseCode } from '../coursecode';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public loading = true;

  subject:any[];
  component:any[];
  campus:any[];
  design:any[];
  start_time:any[];
  end_time:any[];
   
  day = [
    { value:"Mon", key:"M" },
    { value:"Tue", key:"Tu"},
    { value:"Wed", key:"W" },
    { value:"Thu", key:"Th" },
    { value:"Fri", key:"F" }
  ]
  daysArray=['M','Tu','W','Th','F'];
  courseInfoResult:Object;
  resultLength: Number;
  resultLengthStr: string;
  courseResult: any[];
  p:Number;
  public errorMsg: string;
  public successMsg: string;

  selectedSubject: string = '';
  selectedSubject_id: string = '';

  constructor(public _http:HttpService,
    public formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getTimetable();
  }
  
  searchForm = this.formBuilder.group({
    subject: new FormControl('All Subjects', Validators.required),
    start_time: new FormControl('All', Validators.required),
    end_time: new FormControl('All', Validators.required),
    days: new FormControl(this.daysArray,Validators.required),
    campus: new FormControl('Any', Validators.required),
    //enrl_stat: new FormControl('Not Full', Validators.required), 
    component: new FormControl('All',Validators.required)
  });


  getTimetable(){
      this._http.getTimetable().subscribe((timeTable:TimeTable[])=>{
      this.subject=timeTable['timeTableInfoJson']['subject'];
      this.campus=timeTable['timeTableInfoJson']['Campus'];
      this.component=timeTable['timeTableInfoJson']['Component'];
      this.design=timeTable['timeTableInfoJson']['Designation'];
      this.start_time=timeTable['timeTableInfoJson']['start_time'];
      this.end_time=timeTable['timeTableInfoJson']['end_time'];
      this.loading=false;
    },
    (error:ErrorEvent)=>{
      this.errorMsg = error.error.message;
      this.loading = false;
    })
  }

  // event handler for the select element's change event
  selectedChangeHandler (event : any){
    // update the ui
    this.selectedSubject = event.target.value;
    for(var i=0; i<this.subject.length; i++){
      if(this.subject[i].subject_value == this.selectedSubject){
          this.selectedSubject_id = this.subject[i].subject_id;
      }
    }
  }

  onSubmitID(form : NgForm){
    //console.log(this.selectedSubject_id);
    this._http.getCourseCode(this.selectedSubject_id).subscribe((res) =>{
      this._http.courseCodes = res as courseCode[];
    });           
  }

  getSelected(name:string, event:any){
    //console.log();
    var string = `${event.target.value}`;
    console.log(`${name}:${string}`);
  }
  
  
  getDays(event: any){
    if(event.target.checked){
      this.daysArray.push((event.target.value));
    }
    else{
      this.daysArray=this.daysArray.filter(function(item){
        return item != event.target.value
      })
    }
    this.searchForm.patchValue({days:this.daysArray})
  }

  get f(){
    return this.searchForm.controls;
  }

  onSubmit(){
    if(this.searchForm.value.subject=="All Subjects"){
      this.searchForm.removeControl("subject");
    }
    if(this.searchForm.value.start_time=="All"){
      this.searchForm.removeControl("start_time");
    }
    if(this.searchForm.value.end_time=="All"){
      this.searchForm.removeControl("end_time");
    }
    if(this.searchForm.value.campus=="Any"){
      this.searchForm.removeControl("campus");
    }
    if(this.searchForm.value.component=="All"){
      this.searchForm.removeControl("component");
    }
    const body=JSON.stringify(this.searchForm.value);
    console.log(body);
    this._http.search(body).subscribe(res =>{
      this._http.results = res as Result[];
      this.courseInfoResult =this._http.results;
      console.log(this.courseInfoResult);
      this.resultLength =this.courseInfoResult['length'];
      this.resultLengthStr = this.resultLength + " Results";
      console.log(this.resultLengthStr);
      this.courseResult = this.courseInfoResult['result'];
    })
  }
}

