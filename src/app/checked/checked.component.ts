import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.css']
})
export class CheckedComponent implements OnInit {
name="";
hide1="s";
hide2="h";
hide3="h";
add1="";
add2="";
city="";
price;
items:any=[];
orders:any;
myorders:any;
constructor(private data:AuthService,private route:ActivatedRoute,private router:Router) { }
urlPost="http://localhost:2400/order";
urlGet="http://localhost:2400/orders";
  ngOnInit() {
    this.orders=this.data.checkedData;
    var routeUrl=this.router.url;
    if(routeUrl=="/orders"){
      this.hide1="h";
      this.hide2="h";
      this.hide3="s";
      this.data.getData(this.urlGet).subscribe(resp=>{
        this.data.myorders=resp;
        this.myorders= this.data.myorders;
        console.log(this.myorders);
      })
    }
    if(routeUrl=="/checkout"){
      this.hide1="s";
      this.hide2="h";
      this.hide3="h";
      this.data.getData(this.urlGet).subscribe(resp=>{
        this.data.myorders=resp;
        this.myorders= this.data.myorders;
        console.log(this.myorders);
      })
    }
    this.price=this.orders.reduce((acc,curr)=>acc.price+curr.price);
    this.items=this.orders.map(n=>{n.count,n.prodId});
    console.log(this.items);
  }
submit(){
  var obj={	name:	this.name,address:	this.add1+this.add2, "city":	this.city,
  totalPrice:	this.price,
  items:this.items,
 email:	this.data.loginData.email
};
this.data.postData(this.urlPost,obj).subscribe(resp=>{
  console.log(resp);
  this.hide1="h";
  this.hide2="s";
  this.hide3="h";
  this.data.cartData=[];
 this.data.updateCartCount(); 
})
}
}
