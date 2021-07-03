import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'HomeComponent', pathMatch:'full'},
  // {path:'', component:HomeComponent  },
   {path: 'HomeComponent', component:HomeComponent,pathMatch: 'full'}, //new
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
