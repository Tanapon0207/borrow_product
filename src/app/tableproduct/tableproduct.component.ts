import { Component, OnInit} from '@angular/core';
import { NgModule} from '@angular/core';
//import { Service } from './service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarService } from '../service/car.service';
import { Car } from '../model/product/car';
import Swal from 'sweetalert2';
import { RouterModule, Routes } from '@angular/router';
import { TablecomComponent } from '../tablecom/tablecom.component';
import { BillComponent } from '../bill/bill.component';

const routes: Routes = [
  {path: "tablecom", component: TablecomComponent},
  {path: "bill", component: BillComponent}
];



@Component({
  selector: 'app-tableproduct',
  templateUrl: './tableproduct.component.html',
  styleUrls: ['./tableproduct.component.css']
})


export class TableproductComponent implements OnInit{

  carDetail !: FormGroup;
  carObj : Car = new Car();
  carList : Car[] = [];

  constructor(private formBuilder : FormBuilder, private carService : CarService) { }

  ngOnInit(): void {

    this.getAllCar();

    this.carDetail = this.formBuilder.group({
      _id : [''],
      Year : [''],
      Month : [''],
      Make : [''],
      Quantity: ['']

      //position: ['']

    });

  }

  addCar() {
    console.log(this.carDetail);
    //this.carObj._id = this.carDetail.value._id;
    this.carObj.Year = this.carDetail.value.Year;
    this.carObj.Month = this.carDetail.value.Month;
    this.carObj.Make = this.carDetail.value.Make;
    this.carObj.Quantity = this.carDetail.value.Quantity;

    //this.userObj.position = this.userDetail.value.position;


    this.carService.addCar(this.carObj).subscribe(res=>{
      Swal.fire(
        'เพิ่มข้อมูลสำเร็จ!',
        'เพิ่มข้อมูลในฐานข้อมูลเรียบร้อยเเล้ว!',
        'success'
      )
        console.log(res);
        this.getAllCar();
        this.carDetail.reset()

      },err=>{
        console.log(err);
    });

  }

  getAllCar() {
    this.carService.getAllCar().subscribe(res=>{
        this.carList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editCar(car : Car) {
    this.carDetail.controls['_id'].setValue(car._id);
    this.carDetail.controls['Year'].setValue(car.Year);
    this.carDetail.controls['Month'].setValue(car.Month);
    this.carDetail.controls['Make'].setValue(car.Make);
    //this.carDetail.controls['position'].setValue(car.position);
    this.carDetail.controls['Quantity'].setValue(car.Quantity);




  }

  updateCar() {
    this.carObj._id = this.carDetail.value._id;
    this.carObj.Year = this.carDetail.value.Year; // แก้ไขชื่อตัวแปรเป็น firstname
    this.carObj.Month = this.carDetail.value.Month; // แก้ไขชื่อตัวแปรเป็น lastname
    this.carObj.Make = this.carDetail.value.Make;
    this.carObj.Quantity = this.carDetail.value.Quantity;


    this.carService.updateCar(this.carObj).subscribe(
      res => {
        Swal.fire(
          'แก้ไขข้อมูลสำเร็จ!',
          'ข้อมูลของคุณเป็นปัจจุบันเรียบร้อยแล้ว!',
          'success'
        );
        console.log(res);
        this.getAllCar();
      },
      err => {
        console.log(err);
      }
    );
  }


  deleteCar(car : Car) {

    this.carService.deleteCar(car).subscribe((res: any)=>{
      Swal.fire(
        'ลบข้อมูลสำเร็จ!',
        'ข้อมูลของคุณลบเรียบร้อยแล้ว!',
        'success'
      );
      //console.log(res);
      this.getAllCar();
    },(err: any) => {
      console.log(err);
    });

  }






}



