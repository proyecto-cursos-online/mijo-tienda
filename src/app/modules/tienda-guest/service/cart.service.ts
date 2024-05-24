import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart = new BehaviorSubject<Array<any>>([]);
  public currentData$ = this.cart.asObservable();

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  addCart(DATACART:any){
    let listCart = this.cart.getValue();
    let Index = listCart.findIndex(item => item.course_id == DATACART.course_id);
    if(Index == -1){
      listCart.unshift(DATACART);
    }
    this.cart.next(listCart);
  }
  
  resetCart(){
    let listCart:any = [];
    this.cart.next(listCart);
  }

  removeItemCart(DATACART:any){
    let listCart = this.cart.getValue();
    let Index = listCart.findIndex(item => item.id == DATACART.id);
    if(Index != -1){
      listCart.splice(Index,1);
    }
    this.cart.next(listCart);
  }

  listCart(){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authService.token});
    let URL = URL_SERVICES+"/ecommerce/cart";
    return this.http.get(URL,{headers: headers});
  }

  registerCart(data:any){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authService.token});
    let URL = URL_SERVICES+"/ecommerce/cart";
    return this.http.post(URL,data,{headers: headers});
  }

  deleteCart(cart_id:any){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authService.token});
    let URL = URL_SERVICES+"/ecommerce/cart/"+cart_id;
    return this.http.delete(URL,{headers: headers});
  }

  applyCupon(data:any){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authService.token});
    let URL = URL_SERVICES+"/ecommerce/apply_coupon";
    return this.http.post(URL,data,{headers: headers});
  }
  checkout(data:any){
    let headers = new HttpHeaders({"Authorization": "Bearer "+this.authService.token});
    let URL = URL_SERVICES+"/ecommerce/checkout";
    return this.http.post(URL,data,{headers: headers});
  }
}
