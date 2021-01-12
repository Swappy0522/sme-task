import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './Components/admin/events/events.component';
import { MembersComponent } from './Components/admin/members/members.component';
import { PostsComponent } from './Components/admin/posts/posts.component';
import { DefaultComponent } from './Components/client/default/default.component';
import { HomeComponent } from './Components/client/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'members',
    component: MembersComponent,
  },

  {
    path: 'posts',
    component: PostsComponent,
  },
  { path: '**', component: DefaultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
