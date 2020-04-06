import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/partial/navbar/navbar.component'
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component'
import { PluckPipe } from './pipes/pluck.pipe'
import { EllipsisPipe } from './pipes/ellipsis.pipe'
import { EllipsisJoinPipe } from './pipes/ellipsis-join.pipe'
import { CapFirstPipe } from './pipes/cap-first.pipe'
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component'
import { HeroComponent } from './components/partial/hero/hero.component'
import { BulmaDropdownComponent } from './components/partial/bulma-dropdown/bulma-dropdown.component'
import { ChefComponent } from './components/chefs/chef/chef.component'
import { StoreModule } from '@ngrx/store'
import { RecipeReducer } from './store/reducers/recipe.reducer'
import { RecipeEffects } from './store/effects/recipe.effects'
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtInterceptor } from './interceptor/jwt.interceptor'
import { ErrorInterceptor } from './interceptor/error.interceptor'
import { LoginComponent } from './components/auth/login/login.component'
import { MainComponent } from './components/partial/main/main.component'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginFormComponent } from './forms/login-form/login-form.component'
import { AuthReducer } from './store/reducers/auth.reducer'
import { AuthEffects } from './store/effects/auth.effects'

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
    ChefComponent,
    LoginComponent,
    MainComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ recipes: RecipeReducer, auth: AuthReducer }),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
