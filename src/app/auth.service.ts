import { Injectable } from '@angular/core';
import { Observable, Subject,  BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
loginStaus:boolean=false;
item:any;
total=0;
myorders:any;
manageDetails:any;
cartData:any=[];
loginData:any;
checkedData:any;
constructor(private http:HttpClient) { }
private loginStatusObs =new Subject<boolean>();
 loginStatusObs$ = this.loginStatusObs.asObservable();
 private totalItems =new BehaviorSubject(0);
 totalItems$ = this.totalItems.asObservable();

 getCartItems() {
     return this.totalItems.asObservable();
 }

 updateCartCount() {
     this.totalItems.next(this.cartData.length);
 }
 getData(url){
  return this.http.get(url);
 }
 deleteData(url){
  return this.http.delete(url);
 }
 postData(url,obj){
  return this.http.post(url,obj);
 }
 putData(url,obj){
  return this.http.put(url,obj);
 }
  login(){
    this.loginStaus=true;
    this.loginStatusObs.next(this.loginStaus);
  }
  logout(){
    this.loginStaus=false;
    this.loginData=null;
    this.loginStatusObs.next(this.loginStaus);
  }
}
