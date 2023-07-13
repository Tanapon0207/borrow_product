import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Car } from '../model/product/car';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarService {
/*
  filter(arg0: (u: any) => boolean): UserService {
    throw new Error('Method not implemented.');
  }
  */


  addCarURL : string;
  getCarURL : string;
  updateCarURL : string;
  deleteCarURL : string;

  constructor(private http:HttpClient) {
    this.addCarURL = 'http://localhost:9100/car/create';
    this.getCarURL = 'http://localhost:9100/car';
    this.updateCarURL = 'http://localhost:9100/car/update';
    this.deleteCarURL = 'http://localhost:9100/car/delete';
   }

   addCar(car : Car) : Observable<Car> {

    return this.http.post<Car>(this.addCarURL,car);
   }

   getAllCar(): Observable<Car[]> {
    return this.http.get<Car[]>(this.getCarURL);

   }


   updateCar(car :Car) : Observable<Car>{
    return this.http.put<Car>(this.updateCarURL, car);
  }

/*
  deleteCar(car: Car): Observable<Car> {
    return this.http.delete<Car>(this.deleteCarURL + '/' + car._id);
  }
*/

  deleteCar(car: Car): Observable<Car> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: car._id
      },
    };
    return this.http.delete<Car>(this.deleteCarURL , options);

  }

}
