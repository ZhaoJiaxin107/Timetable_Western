import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { TimeTable } from '../timetableSchema';
import { throwError } from 'rxjs';
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

  public errorMsg: string;
  public successMsg: string;

  selectedSubject: string = '';
  selectedSubject_id: string = '';

  constructor(private _http:HttpService) { }

  ngOnInit(): void {
    this.getTimetable();
  }

  getTimetable(){
      this._http.getTimetable().subscribe((timeTable:TimeTable[])=>{
      this.subject=timeTable['timeTableInfoJson']['subject'];
      this.campus=timeTable['timeTableInfoJson']['Campus'];
      this.component=timeTable['timeTableInfoJson']['Component'];
      this.design=timeTable['timeTableInfoJson']['Designation'];
      // this.timeTable=timeTable;
      
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
}
