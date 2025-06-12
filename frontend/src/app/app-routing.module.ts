import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { NgModule } from '@angular/core'
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ViewPostsComponent } from './components/view-posts/view-posts.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
    {path:'employees',component:EmployeeListComponent},
    {path:'employees/:id',component:EmployeeDetailComponent},
    {path:'add-employee',component:EmployeeDetailComponent},
    {path:'user-details/:id',component:UserDetailsComponent},
    {path:'view-posts/:id',component:ViewPostsComponent},
    {path:'profile/:id', component: ProfileComponent },
    {path:'posts/:id', component: PostsComponent },
    {path:'welcome', component: WelcomeComponent },
    {path:"",redirectTo:"welcome",pathMatch:'full'}, 
    {path:'**',redirectTo:"welcome"} 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],   
    exports:[RouterModule]
})
export class AppRoutingModule{}