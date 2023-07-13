type BillIteme = any;

export class Bill {

  _id:  number = 0;
    day_b : String = '';
    //model:String = '';
    //product_name: String = '';
    group: String = '';
    //amount:  number = 0;
    price:   number = 0;
    status:String = '';
    product_no: String = '';
    billItems : Array<BillIteme> = [];

}
