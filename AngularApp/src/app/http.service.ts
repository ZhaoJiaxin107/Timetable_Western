import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TimeTable} from './timetableSchema';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  rootURL=`${environment.API_URL}/timetable`;

  getTimetable(): Observable<TimeTable[]>{
    return this.http.get<TimeTable[]>(`${this.rootURL}/getTimetableSchema`);
  }
}