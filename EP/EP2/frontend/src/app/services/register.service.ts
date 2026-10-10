import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  API="http://localhost:3000";
  constructor(private http:HttpClient) { 

  }

  register(data:Register):Observable<any>{
      return this.http.post(`${this.API}/users`,data);
  }


}
