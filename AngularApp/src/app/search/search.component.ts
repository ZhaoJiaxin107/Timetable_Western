import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { TimeTable } from '../timetableSchema';
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

}
