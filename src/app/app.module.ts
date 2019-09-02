import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Material Angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatSelectModule, MatButtonModule, MatSidenavModule} from '@angular/material';

// ng Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    ProfileComponent,
    UserAddComponent,
    ManageUsersComponent,
    ManageGroupsComponent,
    ChatComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
