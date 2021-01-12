import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

constructor(private auth:AuthService,private route:ActivatedRoute,private router:Router) { }
  typeStructure=null;
  urlGet="http://localhost:2400/products";
  typeArray=["Sunglasses","Watches","Handbags","Wallets","Formal Shoes","Sport Shoes","Floaters","Sandals"];
  cartCount=0; 
  cat="";
  role="";
  details:any=[];
  item:any;
  cartData:any=[];

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.cat = params.get("category");
      this.getData();
      console.log(this.cat);
      });
    this.getData();
  
  }
  getData(){
    var temp="";
   if(this.cat) temp=this.urlGet+"/"+this.cat;
     else temp=this.urlGet;
    this.auth.getData(temp).subscribe(res=>{
      this.details=res;
      this.details.map(n=>{if(n.add==undefined) n.add=false;});
      this.details.map(n=>this.auth.cartData.find(obj=>{
        if(obj.prodId===n.prodId) n.add=true;
      }));
      console.log(this.details,this.auth.cartData);
    });
    console.log(temp);
  }
  filterData(val){
  if(val=="All") {
    this.router.navigate(["/products/"]);
  }
 else  this.router.navigate(["/products/"+val]);
  }

  addToCart(i){
    this.details[i].add=true;
    this.cartCount=this.cartCount+1;
    this.auth.total=this.cartCount;
    this.auth.cartData.push(this.details[i]);
    this.auth.cartData.map(n=>{if(n.count===undefined)n.count=1 });
    this.auth.updateCartCount();
 }
  removeToCart(id,i){
    console.log(id);
    this.cartCount=this.cartCount-1;
    this.auth.total=this.cartCount;
  
    this.details[i].add=false;
    var x =this.details[i];
   this.auth.cartData.splice(this.auth.cartData.indexOf(x),1);
   this.auth.updateCartCount();
  }
  /*this.service.udateCartCount(this.cartCount);
  selectItem(i){
    this.type=this.details[i].category;
    this.id=this.details[i].prodCode;
    this.auth.item=this.details[i];
    let path ="products/"+this.type+"/"+this.id;
    this.router.navigate([path]);
  }
 */
}
