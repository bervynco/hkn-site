import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VideoNewsComponent } from './components/video-news/video-news.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { BusinessComponent } from './components/business/business.component';
import { CrimeComponent } from './components/crime/crime.component';
import { PoliticsComponent } from './components/politics/politics.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { CelebirtyComponent } from './components/celebirty/celebirty.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },


  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'business-news',
    component: BusinessComponent
  },
  {
    path: 'crime-news',
    component: CrimeComponent
  },
  {
    path: 'politics-news',
    component: PoliticsComponent
  },
  {
    path: 'entertainment-news',
    component: EntertainmentComponent
  },
  {
    path: 'celebrity-news',
    component: CelebirtyComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'article/:type/:slug',
    component: ArticleComponent
  },
  {
    path: 'video-news/:type/:slug',
    component: VideoNewsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
