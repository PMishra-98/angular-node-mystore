import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
email="";
footwear=[{link:'/',active:'active',txt:'Watches'},
{link:'/Watches',active:'active',txt:'Watches'},
{link:'/Watches',active:'active',txt:'Watches'},
{link:'/Watches',active:'active',txt:'Watches'},]
  constructor(private authService:AuthService,private router:Router, private route:ActivatedRoute, private changeDetector:ChangeDetectorRef){}
  navlinks1:{link:string,active:string,txt:string}[];
  navlinks2:{link:string,active:string,txt:string}[];
  total;
  ngOnInit(){
    this.authService.totalItems$.subscribe(res=>{
        this.total=res;
    });
    console.log(this.total);
    this.authService.loginStatusObs$.subscribe(
      status=>{
        this.updateNavBar();
      }
    )
    this.updateNavBar();
  }
  updateNavBar(){
    var logout ={link:'/logout',active:'active',txt:'Logout'};
    var login ={link:'/login',active:'active',txt:'Login'};
    var myOrder ={link:'/orders',active:'active',txt:'My Orders'};
    var mProducts ={link:'/manageorders',active:'active',txt:'Manage Products'};
    this.navlinks2=[{link:'/Watches',active:'active',txt:'Watches'},
    {link:'/Sunglasses',active:'active',txt:'Sunglasses'},
    {link:'/Belts',active:'active',txt:'Belts'},
    {link:'/Handbags',active:'active',txt:'Handbags'}
    ];
    if(this.authService.loginStaus){
      if(this.authService.loginData){
       this.email=this.authService.loginData.email;
       this.navlinks1=[myOrder,mProducts,logout];
       this.changeDetector.detectChanges();
       console.log(this.navlinks1,this.email);
      }
    }
    else{
      this.email=null;
      this.navlinks1=[login];
      this.changeDetector.detectChanges();
    }
 }
}
