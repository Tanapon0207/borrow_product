import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../model/product/product';
import { ProductService } from '../service/product.service';




import Swal from 'sweetalert2';


let date_buy = new Date();
console.log(date_buy.toString());
console.log(date_buy.toLocaleString());
let result = date_buy.toLocaleString('th-TH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
});

console.log(result);
console.log("เวลาปัจจุบัน คือ " + date_buy.getHours() + ":" + date_buy.getMinutes() + ":" + date_buy.getSeconds());

@Component({
  selector: 'app-tablecom',
  templateUrl: './tablecom.component.html',
  styleUrls: ['./tablecom.component.css']
})
export class TablecomComponent implements OnInit {

  length_p: number = 0;
  count1: string = "";
  productDetail !: FormGroup;
  productObj: Product = new Product();
  productList: any
  productListtemp: any[] = [];
  row: any;
  filteredData: any[] = [];




  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router

  ) { }

  ngOnInit(): void {



    this.getAllProduct();

    this.productDetail = this.formBuilder.group({
      _id: [''],
      date_buy: [''],
      product_no: [''],
      model: [''],
      product_name: [''],
      brand:[''],
      group: [''],
      amount: [''],
      price: [''],
      status: ['']


      //position: ['']

    });

  }

  //เพิ่มข้อมูล
  addProduct() {
    console.log(this.productDetail);
    //this.carObj._id = this.productDetail.value._id;
    //this.productObj.date_buy = this.productDetail.value.date_buy;
    this.productObj.product_no = this.productDetail.value.product_no;
    this.productObj.model = this.productDetail.value.model;
    this.productObj.product_name = this.productDetail.value.product_name;
    this.productObj.brand = this.productDetail.value.brand;
    //this.productObj.group = this.productDetail.value.group;
    this.productObj.amount = this.productDetail.value.amount;
    //this.productObj.price = this.productDetail.value.price;
    //this.productObj.status = this.productDetail.value.status;

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

  //เเสดงข้อมูลทั้งหมด
  getAllProduct() {

    this.productService.getAllProduct().subscribe(res => {
      //console.log(res.length); //จำนวนข้อมูลลที่มีทั้งหมด

      //let length_p = res.length;
      this.length_p = res.length;




      this.productList = res;
      this.productListtemp = res;
      this.columnsWithSearch = Object.keys(this.productList[0]);
      //console.log(this.productList);


      console.log(this.length_p);
      //แสดงค่า length_p บนหน้าจอ
      /*
 const element = document.createElement('p');
 element.textContent = `Length: ${this.length_p}`;
 document.body.appendChild(element);*/




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

  //แก้ไขสินค้า
  editProduct(product: Product) {
    this.productDetail.controls['_id'].setValue(product._id);
   // this.productDetail.controls['date_buy'].setValue(product.date_buy);
    this.productDetail.controls['product_no'].setValue(product.product_no);
    this.productDetail.controls['model'].setValue(product.model);
    this.productDetail.controls['product_name'].setValue(product.product_name);
    this.productDetail.controls['brand'].setValue(product.brand);
    //this.productDetail.controls['price'].setValue(product.price);
    //this.productDetail.controls['group'].setValue(product.group);
    this.productDetail.controls['amount'].setValue(product.amount);
    //this.productDetail.controls['status'].setValue(product.status);




  }


  //อัปเดทสินค้า
  updateProduct() {
    this.productObj._id = this.productDetail.value._id;
    //this.productObj.date_buy = this.productDetail.value.date_buy;
    this.productObj.product_no = this.productDetail.value.product_no;
    this.productObj.model = this.productDetail.value.model;
    this.productObj.product_name = this.productDetail.value.product_name;
    this.productObj.brand = this.productDetail.value.brand;
   // this.productObj.group = this.productDetail.value.group;
    this.productObj.amount = this.productDetail.value.amount;
    //this.productObj.price = this.productDetail.value.price;
    //this.productObj.status = this.productDetail.value.status;


    this.productService.updateProduct(this.productObj).subscribe(
      res => {
        Swal.fire(
          'แก้ไขข้อมูลสำเร็จ!',
          'ข้อมูลของคุณเป็นปัจจุบันเรียบร้อยแล้ว!',
          'success'
        );
        console.log(res);
        this.getAllProduct();
      },
      err => {
        console.log(err);
      }
    );
  }

//ลบสินค้า
  deleteProduct(product: Product) {
    this.productObj._id = product._id;
    console.log(this.productObj)
    let datadelete = {
      _id: product._id
    }


    this.productService.deleteProduct(datadelete).subscribe((res: any) => {
      Swal.fire(
        'ลบข้อมูลสำเร็จ!',
        'ข้อมูลของคุณลบเรียบร้อยแล้ว!',
        'success'
      );
      //console.log(res);
      this.getAllProduct();
    }, (err: any) => {
      console.log(err);
    });

  }

  keysearch: any;
  /*
  updateFilter() {

    this.productList = this.productListtemp.filter(item => {
      // console.log(item.ScanOutStatus);

      return (item.product_name != undefined) ?
        (this.keysearch != "" ? item.product_name.toString().includes(this.keysearch) : true) : true

      //return (this.LTimeIN != "All" ? item.ScanInStatus == this.LTimeIN : true)
      //&& (this.BTimeOUT != "All" ? item.ScanOutStatus == this.BTimeOUT : true)


      // (this.keysearch != "" ? item.ScanOutStatus.toString().includes(this.keysearch) : true)
      // || (this.LLineTimeIN != "" ? item.ScanInStatus .toString().includes(this.LLineTimeIN) : true)


    });

    console.log(this.productList);

  }
  */
  columnsWithSearch: string[] = [];

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
  }

  get selectedCheckboxes() {
    return this.productList.filter((c: { selected: any; }) => c.selected);
  }

//เอาข้อมูลที่เลือกออก
  deselectAll() {
    this.productList.forEach((c: { selected: boolean; }) => (c.selected = false));
    this.selectAll = false;


  }

  //ฟังก์ชันลบข้อมูลที่เลือก
  deleteSelected(): void {
    let selectedCheckboxes = this.selectedCheckboxes;
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



  }





}
