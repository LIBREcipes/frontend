import { DragDropModule } from '@angular/cdk/drag-drop'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppInitService } from './app-init.service'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/auth/login/login.component'
import { ChefDetailComponent } from './components/chefs/chef-detail/chef-detail.component'
import { ModalDirective } from './components/modals/modal.directive'
import { ModalComponent } from './components/modals/modal/modal.component'
import { AutocompleteIngredientComponent } from './components/partial/autocomplete/autocomplete-ingredient/autocomplete-ingredient.component'
import { AutocompleteComponent } from './components/partial/autocomplete/autocomplete.component'
import { BulmaDropdownComponent } from './components/partial/bulma-dropdown/bulma-dropdown.component'
import { ErrorComponent } from './components/partial/error/error.component'
import { FileUploadComponent } from './components/partial/file-upload/file-upload.component'
import { FormErrorComponent } from './components/partial/form-error/form-error.component'
import { HeroComponent } from './components/partial/hero/hero.component'
import { MainComponent } from './components/partial/main/main.component'
import { NavbarComponent } from './components/partial/navbar/navbar.component'
import { NotificationComponent } from './components/partial/notification/notification.component'
import { RecipeAddComponent } from './components/recipes/recipe-add/recipe-add.component'
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component'
import { RecipeEditIngredientsComponent } from './components/recipes/recipe-edit-ingredients/recipe-edit-ingredients.component'
import { RecipeEditStepsComponent } from './components/recipes/recipe-edit-steps/recipe-edit-steps.component'
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component'
import { AutofocusDirective } from './directives/autofocus.directive'
import { PasswordResetRequestComponent } from './forms/auth/password-reset-request/password-reset-request.component'
import { IngredientFormComponent } from './forms/ingredient-form/ingredient-form.component'
import { LoginFormComponent } from './forms/login-form/login-form.component'
import { RecipeCreateFormComponent } from './forms/recipe-create-form/recipe-create-form.component'
import { RecipeIngredientFormComponent } from './forms/recipe-ingredient-form/recipe-ingredient-form.component'
import { RecipeStepsFormComponent } from './forms/recipe-steps-form/recipe-steps-form.component'
import { RegistrationFormComponent } from './forms/registration-form/registration-form.component'
import { JwtInterceptor } from './interceptor/jwt.interceptor'
import { CapFirstPipe } from './pipes/cap-first.pipe'
import { EllipsisJoinPipe } from './pipes/ellipsis-join.pipe'
import { EllipsisPipe } from './pipes/ellipsis.pipe'
import { PluckPipe } from './pipes/pluck.pipe'
import { AuthEffects } from './store/effects/auth.effects'
import { ChefEffects } from './store/effects/chef.effects'
import { RecipeEffects } from './store/effects/recipe.effects'
import { reducers } from './store/reducers/app.reducer'
import { RecipeStepFieldComponent } from './forms/recipe-steps-form/recipe-step-field/recipe-step-field.component';
import { ConfirmDirective } from './directives/confirm.directive';
import { SpinnerComponent } from './components/partial/spinner/spinner.component'

export function init_app(loadService: AppInitService) {
  return () => loadService.init()
}

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    AutocompleteIngredientComponent,
    BulmaDropdownComponent,
    CapFirstPipe,
    ChefDetailComponent,
    EllipsisJoinPipe,
    EllipsisPipe,
    ErrorComponent,
    HeroComponent,
    LoginComponent,
    LoginFormComponent,
    MainComponent,
    NavbarComponent,
    PluckPipe,
    RecipeAddComponent,
    RecipeCreateFormComponent,
    RecipeDetailComponent,
    RecipeEditIngredientsComponent,
    RecipeEditStepsComponent,
    RecipeIngredientFormComponent,
    RecipeListComponent,
    RecipeStepsFormComponent,
    ModalDirective,
    ModalComponent,
    IngredientFormComponent,
    FileUploadComponent,
    AutofocusDirective,
    FormErrorComponent,
    RegistrationFormComponent,
    NotificationComponent,
    PasswordResetRequestComponent,
    RecipeStepFieldComponent,
    ConfirmDirective,
    SpinnerComponent,
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
    DragDropModule,
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
