import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TableuserComponent } from './tableuser/tableuser.component';
import { TableproductComponent } from './tableproduct/tableproduct.component';
import { YourprofileComponent } from './yourprofile/yourprofile.component';
import { BeforeloginComponent } from './beforelogin/beforelogin.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { TablecomComponent } from './tablecom/tablecom.component';
import { BillComponent } from './bill/bill.component';
import { PostBillComponent } from './postbill/postbill.component';



const appRoutes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'product', component: TableproductComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'producttable', component: TableproductComponent},
  { path: 'yourprofile', component: YourprofileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'tableuser', component: TableuserComponent},
  { path : 'tablecom', component: TablecomComponent},
 { path: 'logout', component: LogoutComponent},
  { path: 'dashboard', component: DashboardComponent},
  {path: 'bill', component: BillComponent},
  {path: 'postbill', component: PostBillComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    HomeComponent,
   LoginComponent,
   TableuserComponent,
   TableproductComponent,
   YourprofileComponent,
   BeforeloginComponent,
    RegisterComponent,
    LogoutComponent,
    TablecomComponent,
    BillComponent,
    PostBillComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only set true
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
