import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/auth/login/login.component'
import { ChefDetailComponent } from './components/chefs/chef-detail/chef-detail.component'
import { BulmaDropdownComponent } from './components/partial/bulma-dropdown/bulma-dropdown.component'
import { ErrorComponent } from './components/partial/error/error.component'
import { HeroComponent } from './components/partial/hero/hero.component'
import { MainComponent } from './components/partial/main/main.component'
import { NavbarComponent } from './components/partial/navbar/navbar.component'
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component'
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component'
import { LoginFormComponent } from './forms/login-form/login-form.component'
import { JwtInterceptor } from './interceptor/jwt.interceptor'
import { CapFirstPipe } from './pipes/cap-first.pipe'
import { EllipsisJoinPipe } from './pipes/ellipsis-join.pipe'
import { EllipsisPipe } from './pipes/ellipsis.pipe'
import { PluckPipe } from './pipes/pluck.pipe'
import { AuthEffects } from './store/effects/auth.effects'
import { ChefEffects } from './store/effects/chef.effects'
import { RecipeEffects } from './store/effects/recipe.effects'
import { reducers } from './store/reducers/app.reducer';
import { RecipeAddComponent } from './components/recipes/recipe-add/recipe-add.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeListComponent,
    PluckPipe,
    EllipsisPipe,
    EllipsisJoinPipe,
    CapFirstPipe,
    RecipeDetailComponent,
    HeroComponent,
    BulmaDropdownComponent,
    LoginComponent,
    MainComponent,
    LoginFormComponent,
    ErrorComponent,
    ChefDetailComponent,
    RecipeAddComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects, ChefEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
