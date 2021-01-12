import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl,FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
code="";
type="";
img="";
data;
details:any;
category="";
hide1="s";
hide2="h";
typeArray=["Sunglasses","Watches","Handbags","Wallets","Formal Shoes","Sport Shoes","Floaters","Sandals"];
  constructor(private auth:AuthService,private route:ActivatedRoute,private router:Router, private formBuilder: FormBuilder) { }
 name="";
 price="";
 imgurl="";
 desc="";
 url="http://localhost:2400/product";
  ngOnInit() {
    this.data=this.auth.manageDetails;
    this.route.paramMap.subscribe(params=>{
      this.code = params.get("code");
      this.auth.getData(this.url+"/"+this.code).subscribe(resp=>{
        this.details=resp;
  
    if(this.code){
       this.hide1="s";
      this.hide2="h";
      this.name=this.details.name;
      this.price=this.details.price;
      this.imgurl=this.details.imgLink;
      this.category=this.details.category;
      this.desc=this.details.description;
   
    }
    else{
     this.hide1="h";
     this.hide2="s";
   
    }
   });
  });   
 }

edit(){
  var x ={
    "prodId":	this.code,
    "category":	this.category,
    "description":	this.desc,
    "imgLink":	this.imgurl,
    "name":	this.name,
    "price": this.price};
    this.auth.putData(this.url+"/"+this.code,x).subscribe(resp=>{
      console.log(resp);
    });
    alert("Product Updated Successfully");
} 
delete(){
  this.auth.deleteData(this.url+"/"+this.code).subscribe(resp=>{
console.log(resp);
  });

 this.router.navigate(['/manageorders']);
}
add(){
  var obj={
    "prodId":	this.code,
    "category":	this.category,
    "description":	this.category,
    "imgLink":	this.imgurl,
    "name":	this.name,
    "price": this.price};
    this.auth.postData(this.url,obj).subscribe(resp=>{
      console.log(resp);
      this.router.navigate(['/manageorders']);
    });
  } 
}
