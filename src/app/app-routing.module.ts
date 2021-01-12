import { EditComponent } from './edit/edit.component';
import { CartComponent } from './cart/cart.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckedComponent } from './checked/checked.component';
import { ManageorderComponent } from './manageorder/manageorder.component';

const routes: Routes = [
  {
    path:'products',
    component:ProductComponent,
  },
  {
     path:"",
     redirectTo:"/products", pathMatch:"full"
  },
  {
    path:'products/:category',
    component:ProductComponent
  },
 {
   path:'manageorders/edit/:code',
   component:EditComponent
  },
  {
    path:'manageorders/delete/:code',
    component:EditComponent
   },
  {
    path:'manageorders/new',
    component:EditComponent
  },
  {
    path:'checkout',
    component:CheckedComponent
  },
  {
    path:'orders',
    component:CheckedComponent
  },
  {
    path:'manageorders',
    component:ManageorderComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'logout',
    component:LogoutComponent
  },
  {
    path:'cart',
    component:CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
