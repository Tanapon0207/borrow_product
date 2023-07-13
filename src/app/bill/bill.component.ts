import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product/product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Bill } from '../model/product/bill';
import { BillService } from '../service/bill.service';



//import Swal from 'sweetalert2';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  /*columnsWithSearch: string[] = [];*/
  date_now: string = "";
  day_b: string = "";
  productDetail !: FormGroup;
  productList: any
  productListtemp: any[] = [];
  row: any;
  date_buy: string = "";

  firstname: string = "";
  lastname: string = "";
  username: string = "";

  length_p: number = 0;
  product: any;




  data: any = localStorage.getItem('token')
  userdata = JSON.parse(this.data);

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private billService: BillService,
    private router: Router,




  ) {
    this.firstname = history.state.firstname;
    this.lastname = history.state.lastname;
    this.username = history.state.username;

    //console.log(this.firstname)
    console.log(this.userdata.firstname);

    /*
        this.router.navigateByUrl('/bill', {
          state: {
            day_b: this.day_b
          }
        });
    */


  }



  ngOnInit(): void {



    this.getAllProduct();

    this.productDetail = this.formBuilder.group({
      _id: [''],
      date_buy: [''],
      product_no: [''],
      model: [''],
      product_name: [''],
      brand: [''],
      group: [''],
      amount: [''],
      price: [''],
      status: ['']


      //position: ['']

    });

  }


  selectAll = false;


  toggleSelectAll() {
    this.productList.forEach((c: { selected: any; }) => (c.selected = this.selectAll));

  }


  checkboxChanged() {
    if (this.isAllCheckboxesSelected()) this.selectAll = true;
    else this.selectAll = false;
  }

  isAllCheckboxesSelected() {
    return this.productList.every((c: { selected: any; }) => c.selected);
  }







  submit() {
    let selectedCheckboxes = this.selectedCheckboxes;
    console.log(selectedCheckboxes);

    for (let i = 0; i < selectedCheckboxes.length; i++) {
      let databill = selectedCheckboxes[i];

      console.log(
        "รหัสบิล:" + databill._id,
        "วันที่ซื้อ:" + databill.date_buy,
        "รหัสสินค้า:" + databill.product_no,
        "ชื่อรุ่น:" + databill.model,
        "ชื่อสินค้า:" + databill.product_name,
        "หมวดหมู่:" + databill.group,
        "จำนวน:" + databill.amount,
        "ราคา:" + databill.price,
        "สถานะ:" + databill.status,

      );




      // console.log(databill.date_buy)
      //console.log(databill.amount);


      this.router.navigateByUrl('/bill', {
        state: {
          date_buy: databill.date_buy,
          product_name: databill.product_name,

        }
      });
    }

    this.day_b = this.getCurrentDateTime();
    this.router.navigateByUrl('/bill', {
      state: {
        day_b: this.day_b
      }
    });
  }


  getCurrentDateTime(): string {
    const date = new Date();

    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',

      hour: 'numeric',
      minute: 'numeric',
      //second: 'numeric'
    });

  }




  get selectedCheckboxes() {
    return this.productList.filter((c: { selected: any; }) => c.selected);
  }

  deselectAll() {
    this.productList.forEach((c: { selected: boolean; }) => (c.selected = false));
    this.selectAll = false;
  }

  deselectAll1() {
    this.productList.forEach((c: { selected: boolean; }) => (c.selected = false));
    this.selectAll = false;
  }

  getAllProduct() {


    this.productService.getAllProduct().subscribe(res => {
      // console.log(res.length); //จำนวนข้อมูลที่มีทั้งหมด

      this.length_p = res.length
      this.productList = res;
      this.productListtemp = res;
      this.columnsWithSearch = Object.keys(this.productList[0]);
      console.log(this.productList);
      console.log(this.productList.length);


      /*
              this.router.navigateByUrl('/bill', {
                state: {

                  date_buy: this.productList.date_buy,
                  product_no: this.productList.product_no,
                  model: this.productList.model,
                  product_name: this.productList.product_name,
                  group: this.productList.group,
                  amount: this.productList.amount,
                  price: this.productList.price,
                  status: this.productList.status

                }
              });
              */
    }, err => {
      console.log("error while fetching data.")

    });
  }

  columnsWithSearch: string[] = [];
  keysearch: any;
  updateFilter() {
    let filterValue = this.keysearch
    let filter = filterValue.toLowerCase();
    this.productList = this.productListtemp.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
        var colValue = item[this.columnsWithSearch[i]];
        if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
          return true;
        }
      }
    });
  }

  /*
//หลังกดยืนยันในบิล
  addBill() {
    console.log("วัน/เวลา :" +this.day_b);
    console.log("ชื่อ-นามสกุล :" + this.userdata.firstname+" " + this.userdata.lastname);



    for (let i = 0; i < this.selectedCheckboxes.length; i++) {
      let databill = this.selectedCheckboxes[i];
      console.log("ชื่อสินค้า : " + databill.product_name);
      console.log("ชื่อรุ่น : " + databill.model);
      console.log("จำนวน : " + databill.amount);

    }


    this.router.navigateByUrl('/bill', {
      state: {
        date_buy: this.date_buy,
      }
    });
  }
  */
  /*
    addProduct() {
      console.log(this.productDetail);
      //this.carObj._id = this.productDetail.value._id;
      this.productObj.date_buy = this.productDetail.value.date_buy;
      this.productObj.product_no = this.productDetail.value.product_no;
      this.productObj.model = this.productDetail.value.model;
      this.productObj.product_name = this.productDetail.value.product_name;
      this.productObj.group = this.productDetail.value.group;
      this.productObj.amount = this.productDetail.value.amount;
      this.productObj.price = this.productDetail.value.price;
      this.productObj.status = this.productDetail.value.status;

      //this.userObj.position = this.userDetail.value.position;


      this.productService.addProduct(this.productObj).subscribe(res => {
        Swal.fire(
          'เพิ่มข้อมูลสำเร็จ!',
          'เพิ่มข้อมูลในฐานข้อมูลเรียบร้อยเเล้ว!',
          'success'
        )
        console.log(res);
        this.getAllProduct();
        this.productDetail.reset()

      }, err => {
        console.log(err);
      });

    }
    */


  //ฟังก์ชันลบข้อมูลที่เลือก


  addBill() {

    const day_b = this.day_b;
    const firstname = this.userdata.firstname;
    const lastname = this.userdata.lastname;
    const id = this.data._id;

    const selectedCheckboxes = this.selectedCheckboxes;



    selectedCheckboxes.forEach((c: { _id: any; }) => {
      //this.deleteProduct(c.selected);
      // Perform deletion operation for the selected item c
      // ...

      //console.log(this.selectedCheckboxes);
      //console.log(c._id);

      //console.log(c.selected);
      let datadelete = {
        _id: c._id
      }


      this.productService.deleteProduct(datadelete).subscribe((res: any) => {
        Swal.fire(
          'ลบข้อมูลสำเร็จ!',
          'ข้อมูลของคุณลบเรียบร้อยแล้ว!',
          'success'
        );
        this.getAllProduct();
      }, (err: any) => {
        console.log(err);
      });



    });


    const billItems = [];


    for (let i = 0; i < selectedCheckboxes.length; i++) {
      const databill = selectedCheckboxes[i];
      const Isuse = 0;
      const id = databill._id;
      const product_no = databill.product_no;
      const date_buy = databill.date_buy;
      const product_name = databill.product_name;
      const model = databill.model;
      const amount = databill.amount;

      //console.log(databill);
      //console.log(id)
      //console.log('วัน/เวลา: ' + day_b);
      //console.log('ชื่อ-นามสกุล: ' + firstname + ' ' + lastname);
      //console.log("รหัสสินค้า :" + product_no);
      //console.log('ชื่อสินค้า: ' + product_name);
      //console.log('ชื่อรุ่น: ' + model);
      //console.log('จำนวน: ' + amount);

      const billItem = {
        _id: id,
        date_buy: date_buy,
        product_no: product_no,
        product_name: product_name,
        model: model,
        amount: amount,
        Isuse: 0,


      };

      billItems.push(billItem);
      console.log(billItems);
      console.log(id); //รหัส id สินค้าที่ทำการยืม มาจาก  const id = databill._id;

      const allItems = billItems.slice();
      console.log(allItems);

    }


    const billData = {
      day_b: day_b,
      firstname: firstname,
      lastname: lastname,
      billItems: billItems



    };


    this.http.post('http://localhost:9100/bill/create', billData).subscribe(
      (response: any) => {


        console.log(response);

        Swal.fire(
          'ยืม สำเร็จ!',
          'ทำการยืมเรียบร้อยเเล้ว!',
          'success'

        )







        console.log('Response:', response);
        console.log(response);






      },
      (error: any) => {
        console.error('Error:', error);
      }








    );







    this.router.navigateByUrl('/postbill', {
      state: {

       billData:billData

        //billItems : billItems,
        //password: bodyData.password,
        // lastname: bodyData.lastname,
        //confirmpassword: bodyData.confirmpassword
      }
    });










  }








}




