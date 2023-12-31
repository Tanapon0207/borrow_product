import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logout() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:9100/api/login';

  constructor(private http: HttpClient) { }

  login (username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });

  }
/*
  logout(){

    localStorage.clear();
    //location.href='./home/home.component.html'
}


*/



}

