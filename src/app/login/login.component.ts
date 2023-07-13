import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  confirmpassword: string = "";


  data: any;
  isLogin: boolean = true;
  errorMessage: string = "";
  token: any;


  constructor(private router: Router, private http: HttpClient) {

    this.firstname = history.state.firstname;
    this.lastname = history.state.lastname;
    this.username = history.state.username;
    this.password = history.state.password;
    this.confirmpassword = history.state.confirmpassword;

  }



  login() {
    // เตรียมข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
    let bodyData = {

      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      confirmpassword: this.confirmpassword


    };




    //console.log(bodyData); // แสดงข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์ในรูปแบบ JSON
    //console.log(bodyData.username); // แสดงข้อมูลของฟิลด์ username
    //console.log(bodyData.firstname);
    //console.log(bodyData.lastname);
    // console.log(bodyData.password);
    //console.log(bodyData.confirmpassword);






    // ทำการส่งคำขอ POST ไปยังเซิร์ฟเวอร์
    this.http.post("http://localhost:9100/user/login", bodyData).subscribe((resultData: any) => {

      // ตรวจสอบผลลัพธ์ที่ได้จากเซิร์ฟเวอร์
      if (resultData.status) {
        Swal.fire(
          'Login สำเร็จ!',
          'เข้าสู่ระบบเรียบร้อยแล้ว!',
          'success'
        );


        //console.log("Success login");
        //console.log(bodyData)
        //console.log("uuuu", resultData)

        //แสดงวันที่และเวลา
        let date_buy = new Date();
        //console.log(date_buy.toString());
        console.log(date_buy.toLocaleString());
        let result = date_buy.toLocaleString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        });

        console.log(bodyData);
        console.log(result);
        console.log("เวลาปัจจุบัน คือ " + date_buy.getHours() + ":" + date_buy.getMinutes() + ":" + date_buy.getSeconds());


        //แสดงข้อมูลผู้ใช้
        //console.count(bodyData.username)
        localStorage.setItem('token', JSON.stringify(resultData.message));
        //console.log(resultData.message); //แสดงข้อมูลทั้งหมดของ user
        console.count(resultData.message._id); //ค่า id กับจำนวนที่ login

        //console.log('token', resultData.message)
        //console.log(resultData.firstname)
        /*
                            //ค้นหา username และนำข้อมูลทั้งมหดของ user มาเเสดงผล
                    const username = bodyData.username;
                    this.http.get(`http://localhost:9100/user/username/${username}`).subscribe(customResponse => {
                      console.log(customResponse ); // แสดงผลลัพธ์ในคอนโซล (Console) เพื่อตรวจสอบ

                      // กำหนดค่าข้อมูลผู้ใช้ให้กับตัวแปร userData
                      const userData = customResponse ;

                          this.data = customResponse



                      // แสดงค่าของฟิลด์ firstname ใน userData

                      console.log(bodyData.firstname)
                      console.log(this.firstname)

                      console.log();


                    }, error => {
                      console.log(error); // แสดงข้อผิดพลาดในคอนโซล (Console) เพื่อตรวจสอบ

                      // หรือจัดการข้อผิดพลาดตามที่คุณต้องการ
                    });*/
        this.router.navigateByUrl('/', {
          state: {
            username: bodyData.username,
            firstname: bodyData.firstname,
            lastname: bodyData.lastname,
            password: bodyData.password,
            confirmpassword: bodyData.confirmpassword
          }
        });



        this.router.navigateByUrl('/', {
          state: {
            username: bodyData.username,
            firstname: bodyData.firstname,
            lastname: bodyData.lastname,

          }
        });
        // นำทางไปยังหน้า home หลังจากเข้าสู่ระบบสำเร็จ
        //this.router.navigateByUrl('/home', { state: { firstname: bodyData.firstname } }); // นำทางไปยังหน้า home หลังจากเข้าสู่ระบบสำเร็จ
      }

      else {
        Swal.fire(
          'Login ไม่สำเร็จ!',
          'กรุณากรอกข้อมูลผู้ใช้ใหม่!',
          'error'
        );
        console.log("Error login");
        this.router.navigateByUrl('/register'); // นำทางไปยังหน้า register หากเข้าสู่ระบบไม่สำเร็จ

      }



    });
    /*
        const username = bodyData.username;
    this.http.get(`http://localhost:9100/user/username/${username}`).subscribe(response => {

      console.log(this.username);
      console.log(this.password);
      console.log(this.firstname);
    }, error => {

    });
    */


    /*
        //ค้นหา username และนำข้อมูลทั้งมหดของ user มาเเสดงผล
        const username = bodyData.username;
    this.http.get(`http://localhost:9100/user/username/${username}`).subscribe(response => {
      console.log(response); // แสดงผลลัพธ์ในคอนโซล (Console) เพื่อตรวจสอบ

      // กำหนดค่าข้อมูลผู้ใช้ให้กับตัวแปร userData
      const userData = response;



      // แสดงค่าของฟิลด์ firstname ใน userData

      console.log(bodyData)

      console.log();
    }, error => {
      console.log(error); // แสดงข้อผิดพลาดในคอนโซล (Console) เพื่อตรวจสอบ

      // หรือจัดการข้อผิดพลาดตามที่คุณต้องการ
    });
    */




  }




}
