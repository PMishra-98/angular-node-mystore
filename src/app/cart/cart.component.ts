import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartData:any;
price;
total=[];
count;
constructor(private data:AuthService,private route:ActivatedRoute,private router:Router) { }
  ngOnInit() {
   this.listShow();
  }
 
remove(i){
  this.data.cartData[i].count -=1;
  console.log( this.data.cartData[i].count);
  if(this.data.cartData[i].count===0){
    this.data.cartData.splice(i,1);
    this.listShow();
    this.data.updateCartCount();
  }
  else{
    this.listShow();
  }
 
}
add(i){
  this.data.cartData[i].count +=1;
  this.listShow();
 } 
listShow(){
  this.cartData=JSON.parse(JSON.stringify(this.data.cartData));
 for(var i=0;i<this.cartData.length;i++){
   this.cartData[i].price= this.data.cartData[i].price*this.data.cartData[i].count;
 }
 this.price=this.cartData.reduce((acc,curr)=>acc.price+curr.price);
 console.log(this.price);
}
checkOut(){
  this.data.checkedData=this.cartData;
 if( this.data.loginStaus) this.router.navigate(["checkOut"]);
 else this.router.navigate(["login"]);
 
}
}
