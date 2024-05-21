import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public http: HttpClient
  ) { }
  home(){
    let URL=URL_SERVICES+"/ecommerce/home";
    return this.http.get(URL);
  }
}
