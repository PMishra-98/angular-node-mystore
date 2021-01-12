import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manageorder',
  templateUrl: './manageorder.component.html',
  styleUrls: ['./manageorder.component.css']
})
export class ManageorderComponent implements OnInit {
  urlGet="http://localhost:2400/products";
  details:any=[];
  search="";
  constructor(private auth:AuthService,private route:ActivatedRoute,private router:Router) { }
  ngOnInit() {
    this.getData();
  }
  getData(){
    this.auth.getData(this.urlGet).subscribe(res=>{
      this.auth.manageDetails=res;
     this.details= this.auth.manageDetails;
      this.details.map(n=>{if(n.add==undefined) n.add=false;});
    });
  }
  searchProduct(){
    if(this.search){
    this.details= this.auth.manageDetails.filter(n=>{
      if(n.name.match(this.search)){
       console.log(n.name);     
       return n;
      }});
    }
      else    this.details= this.auth.manageDetails;
  }
}
