import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  bodyData: any;
  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  confirmpassword: string = "";

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
  }





  register() {
    let bodyData =
    {

      "firstname": this.firstname,
      "lastname": this.lastname,
      "username": this.username,
      "password": this.password,
      "confirmpassword": this.confirmpassword
    };

    if (bodyData != null) {
      Swal.fire(
        'ไม่สำเร็จ!',
        'กรุณากรอกข้อมูลให้ครบถ้วน',
        'error'
      )
    }


    if (this.password != this.confirmpassword) {
      Swal.fire(
        'ไม่สำเร็จ!',
        'กรุณากรอก password กับ confirmpassword ให้ตรงกัน',
        'warning'
      )

    }

  

    else if (bodyData) {

      this.http.post("http://localhost:9100/user/create", bodyData).subscribe((resultData: any) => {




        console.log(resultData);
        Swal.fire(
          'Register สำเร็จ!',
          'ลงทะเบียนเรียบร้อยเเล้ว!',
          'success'

        )



        this.router.navigateByUrl('/login', {
          state: {

            firstname: bodyData.firstname,
            username: bodyData.username,
            password: bodyData.password,
            lastname: bodyData.lastname,
            confirmpassword: bodyData.confirmpassword
          }
        });
        console.log(bodyData);
        console.log("This is Firstname :" + bodyData.firstname);
        console.log("This is Lastanme :" + bodyData.lastname);
        console.log("This is Password :" + bodyData.password);
        console.log("This is Confirmpassword :" + bodyData.confirmpassword);

      });


    }


  }

    save() {
      this.register();
    }



  }



