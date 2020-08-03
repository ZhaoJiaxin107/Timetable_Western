import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TimeTable } from './timetableSchema';
import { courseCode } from './coursecode';
import { Search } from './search';
import { Result } from './result';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  selectedCourseCode : courseCode;
  courseCodes: courseCode[]; 

  selectedResult : Result;
  results: Result[];

  constructor(private http: HttpClient) { }

  rootURL=`${environment.API_URL}/timetable`;

  getTimetable(): Observable<TimeTable[]>{
    return this.http.get<TimeTable[]>(`${this.rootURL}/getTimetableSchema`);
  }

  getCourseCode(_id:string):Observable<courseCode[]>{
    return this.http.get<courseCode[]>(`${this.rootURL}/getCourseCode` + `/${_id}`);
  }

  search(body):Observable<any>{
    const config = { headers: new HttpHeaders().set('Content-Type','application/json') }
    return this.http.post<any>(`${this.rootURL}/getSchedule`,body,config)
  }
}