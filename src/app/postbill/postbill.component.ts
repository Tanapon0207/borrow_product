import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';






///import Swal from 'sweetalert2';
import { Bill } from '../model/product/bill';
import { BillService } from '../service/bill.service';

@Component({
  selector: 'app-post-bill',
  templateUrl: './postbill.component.html',
  styleUrls: ['./postbill.component.css']
})
export class PostBillComponent {


  length_p: number = 0;
  count1: string = "";
  billDetail !: FormGroup;
  billObj: Bill = new Bill();
  billList: any
  billListtemp: any[] = [];
  row: any;
  filteredData: any[] = [];
  billData: any

  //firstname: string = "";
  //lastname: string = "";




  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private billService: BillService,

  ) {
    //this.firstname = history.state.firstname;
    // this.lastname = history.state.lastname;

  }

  ngOnInit(): void {



    this.getAllBill();

    this.billDetail = this.formBuilder.group({


      _id: [''],
      firstname: [''],
      lastname: [''],
      product_no: [''],
      product_name: [''],
      model: [''],
      amount: [''],
      day_b: [''],
      billItems: [''],
      //brand: [''],
      //group: [''],
      //amount: [''],
      //price: [''],
      //status: ['']


      //position: ['']

    });



  }

  selectAll = false;

  toggleSelectAll() {
    this.billList.forEach((c: { selected: any; }) => (c.selected = this.selectAll));

  }

  checkboxChanged() {
    if (this.isAllCheckboxesSelected()) this.selectAll = true;
    else this.selectAll = false;
  }

  isAllCheckboxesSelected() {
    return this.billList.every((c: { selected: any; }) => c.selected);
  }












  getAllBill() {


    this.billService.getAllBill().subscribe(res => {
      // console.log(res.length); //จำนวนข้อมูลที่มีทั้งหมด

      this.length_p = res.length
      this.billList = res;
      this.billListtemp = res;
      //his.columnsWithSearch = Object.keys(this.productList[0]);
      //console.log(this.billList);





      console.log(this.billList.length);
      console.log(this.billList[0].billItems);
      console.log(this.billList);

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



  submit1() {
    let selectedCheckboxes = this.selectedCheckboxes;




    console.log(selectedCheckboxes);//แสดงรายละเอียดการคืน
    for (var i = 0; i < selectedCheckboxes.length; i++) {
      console.log(selectedCheckboxes[i].billItem);
    }




    const billItems = [];

    for (let i = 0; i < selectedCheckboxes.length; i++) {
      let databill = selectedCheckboxes[i];

      //const detail = this.billList
      //console.log(detail);


      const billItem = {
        _id: databill._id,
        product_no: databill.product_no,
        product_name: databill.product_name,
        model: databill.model,
        date_buy: databill.date_buy,
        amount: databill.amount,
        Isuse: 0,


      };



      /*
      for (var i = 0; i < this.billItem.length; i++) {
        console.log(myObject.myArray[i]);
      }
*/


      billItems.push(billItem);
      //console.log(billItems);   //แสดงรายละเอียดการคืน




      //console.log(allItems); //แสดงรายละเอียดการคืน









      // console.log(databill.date_buy)
      //console.log(databill.amount);


      this.router.navigateByUrl('/bill', {
        state: {
          date_buy: databill.date_buy,
          product_name: databill.product_name,

        }
      });
    }
    /*
        this.date_bay = this.getCurrentDateTime();
        this.router.navigateByUrl('/bill', {
          state: {
            day_b: this.day_b
          }
        });
        */



  }


  columnsWithSearch: string[] = [];
  keysearch: any;
  updateFilter() {
    let filterValue = this.keysearch
    let filter = filterValue.toLowerCase();
    this.billList = this.billListtemp.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
        var colValue = item[this.columnsWithSearch[i]];
        if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
          return true;
        }
      }
    });
  }








  get selectedCheckboxes() {
    return this.billList.filter((c: { selected: any; }) => c.selected);
  }



  deselectAll() {
    this.billList.forEach((c: { selected: boolean; }) => (c.selected = false));
    this.selectAll = false;
  }

  deselectAll1() {
    this.billList.forEach((c: { selected: boolean; }) => (c.selected = false));
    this.selectAll = false;
  }








}
