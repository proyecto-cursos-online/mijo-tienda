import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { CartService } from '../tienda-guest/service/cart.service';
import { Router } from '@angular/router';

declare var $: any;
declare function HOMEINIT([]): any;
declare function banner_home(): any;
declare function countdownT(): any;
declare function alertWarning([]): any;
declare function alertDanger([]): any;
declare function alertSuccess([]): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  CATEGORIES: any = [];
  COURSES_HOME: any = [];
  group_courses_categories: any = [];
  desconut_baner: any = null;
  discount_banner_course: any = [];
  desconut_flash: any = null;
  desconut_flash_course: any = [];
  user:any = null;
  constructor(
    public homerservice: HomeService,
    public cartService: CartService,
    public router: Router
  ) {
    setTimeout(() => {
      HOMEINIT($)
    }, 50)
  }
  ngOnInit(): void {
    this.homerservice.home().subscribe((resp: any) => {
      console.log(resp)
      this.CATEGORIES = resp.categories;
      this.COURSES_HOME = resp.courses_home.data;
      this.group_courses_categories = resp.group_courses_categories;
      this.desconut_baner = resp.desconut_baner;
      this.discount_banner_course = resp.discount_banner_course;
      this.desconut_flash = resp.desconut_flash;
      this.desconut_flash_course = resp.desconut_flash_course
      setTimeout(() => {
        banner_home();
        countdownT();
      }, 50)
    })
    this.user = this.cartService.authService.user;
  }

  getNewTotal(course: any, desconut_baner: any) {
    if (desconut_baner.type_discount == 1) {
      return course.precio_usd - course.precio_usd * (desconut_baner.discount * 0.01);
    } else {
      return course.precio_usd - desconut_baner.discount;
    }
  }
  getTotalPriceCourse(course: any) {

    if (course.discount_g) {
      return this.getNewTotal(course, course.discount_g);
    }
    return course.precio_usd
  }
  addCart(LANDING_COURSE: any, DESCOUNT_CAMPAING: any = null) {
    if (!this.user) {
      alertWarning("NECESITAS REGISTRARTE EN LA TIENDA");
      this.router.navigateByUrl("auth/login");
      return;
    }
    if (DESCOUNT_CAMPAING) {
      LANDING_COURSE.discount_g = DESCOUNT_CAMPAING
    }
    let data = {
      course_id: LANDING_COURSE.id,
      type_discount: LANDING_COURSE.discount_g ? LANDING_COURSE.discount_g.type_discount : null,
      discount: LANDING_COURSE.discount_g ? LANDING_COURSE.discount_g.discount : null,
      type_campaing: LANDING_COURSE.discount_g ? LANDING_COURSE.discount_g.type_campaing : null,
      code_cupon: null,
      code_discount: LANDING_COURSE.discount_g ? LANDING_COURSE.discount_g.code : null,
      precio_unitario: LANDING_COURSE.precio_usd,
      total: this.getTotalPriceCourse(LANDING_COURSE),
    };

    this.cartService.registerCart(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alertDanger(resp.message_text);
        return;
      } else {
        this.cartService.addCart(resp.cart);
        alertSuccess("EL CURSO SE AGREGO AL CARRITO EXITOSAMENTE");
      }
    })
  }
}
