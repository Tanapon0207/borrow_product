import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data:any = localStorage.getItem('token')
  userdata = JSON.parse(this.data);

  firstname: string ="";
  lastname: string ="";
  username: string ="";
  password: string ="";
  confirmpassword: string ="";

  constructor(private http: HttpClient) {
    this.firstname = history.state.firstname;
    this.lastname = history.state.lastname;
    this.username = history.state.username;
    this.password = history.state.password;
    this.confirmpassword = history.state.confirmpassword;
//console.log(this.userdata)
  }
/*
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.http.get("http://localhost:9100/user/:id").subscribe((userData: any) => {
      this.username = userData;
    });
  }
  */

}
