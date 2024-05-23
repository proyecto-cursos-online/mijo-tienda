import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

declare var $: any;
declare function HOMEINIT([]): any;
declare function banner_home(): any;
declare function countdownT(): any;

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
  constructor(
    public homerservice: HomeService
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
      }, 100)
    })
  }

  getNewTotal(course: any, desconut_baner: any) {
    if (desconut_baner.type_discount == 1) {
      return course.precio_usd - course.precio_usd * (desconut_baner.discount * 0.01);
    } else {
      return course.precio_usd - desconut_baner.discount;
    }
  }
  getTotalPriceCourse(course:any){

    if (course.discount_g) {
      return this.getNewTotal(course, course.discount_g);
    }
    return course.precio_usd
  }
}
