import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'userAdd', component: UserAddComponent},
  {path: 'manageUsers', component: ManageUsersComponent},
  {path: 'manageGroups', component: ManageGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
