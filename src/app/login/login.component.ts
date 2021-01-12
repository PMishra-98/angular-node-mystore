import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showAddMsg="";
  constructor(private data:AuthService,private route:ActivatedRoute,private router:Router) { }
  simpleForm:FormGroup=null;
  urlPost="http://localhost:2400/login";
  urlGet="";
  returnUrl:string;
  getDetials:any=[];
  loginFail:boolean=false;
ngOnInit(){
  this.createForm();
  this.returnUrl=this.route.snapshot.queryParams['returnUrl']||'/';
}
createForm(){
  this.simpleForm=new FormGroup({
   'email':new FormControl('',[Validators.required ]),
    'pass':new FormControl('',[
      Validators.required,
      Validators.minLength(7)
    ]),
  });
}
get email(){ return this.simpleForm.get('email');}
get pass(){ return this.simpleForm.get('pass');}
onSubmit(){
  var pass1 = this.simpleForm.get('pass').value;
  var email1 = this.simpleForm.get('email').value;
  var obj={email:	email1,
  password:	pass1};
 this.data.postData(this.urlPost,obj).subscribe(resp=>{
   this.data.loginData=resp;
  this.loginFail=true;
  this.data.login();
 
  this.router.navigate(["checkout"]);
  
},error=>{
  this.loginFail=false
   this.showAddMsg=error.message;
   alert("Invalid Email and Password");
});
 }
}
