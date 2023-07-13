import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bill } from '../model/product/bill';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BillService {
  /*
    filter(arg0: (u: any) => boolean): UserService {
      throw new Error('Method not implemented.');
    }
    */


  addBillURL: string;
  getBillURL: string;
  updateBillURL: string;
  deleteBillURL: string;
  backBillURL: string;

  constructor(private http: HttpClient) {
    this.addBillURL = 'http://localhost:9100/bill/create';
    this.getBillURL = 'http://localhost:9100/bill';
    this.updateBillURL = 'http://localhost:9100/bill/update';
    this.deleteBillURL = 'http://localhost:9100/bill/delete';
    this.backBillURL = 'http://localhost:9100/bill/back';
  }

  addBill(bill: Bill): Observable<Bill> {

    return this.http.post<Bill>(this.addBillURL, bill);
  }

  getAllBill(): Observable<Bill[]> {

    return this.http.get<Bill[]>(this.getBillURL);



  }


  updateBill(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(this.updateBillURL, bill);
  }

  /*
    deleteCar(car: Car): Observable<Car> {
      return this.http.delete<Car>(this.deleteCarURL + '/' + car._id);
    }
  */

  deleteBill(bill: any): Observable<Bill> {
    console.log(bill)
    return this.http.put<Bill>(this.deleteBillURL, bill);

  }

  backBill(bill: any): Observable<Bill> {
    console.log(bill)
    return this.http.put<Bill>(this.backBillURL, bill);

  }

}
