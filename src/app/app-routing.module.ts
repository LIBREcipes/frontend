import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component'
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component'
import { ChefDetailComponent } from './components/chefs/chef-detail/chef-detail.component'
import { LoginComponent } from './components/auth/login/login.component'
import { MainComponent } from './components/partial/main/main.component'
import { RecipeAddComponent } from './components/recipes/recipe-add/recipe-add.component'
import { AuthGuard } from './guards/auth.guard'
import { RecipeEditIngredientsComponent } from './components/recipes/recipe-edit-ingredients/recipe-edit-ingredients.component'
import { RecipeEditStepsComponent } from './components/recipes/recipe-edit-steps/recipe-edit-steps.component'
import { ShortlinkToRecipeComponent } from './components/recipes/shortlink-to-recipe/shortlink-to-recipe.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'recipes',
        children: [
          {
            path: 'create',
            component: RecipeAddComponent,
            canActivate: [AuthGuard],
          },
          { path: ':recipe_uuid', component: RecipeDetailComponent },
          {
            path: ':recipe_uuid/edit/ingredients',
            component: RecipeEditIngredientsComponent,
            canActivate: [AuthGuard],
          },
          {
            path: ':recipe_uuid/edit/steps',
            component: RecipeEditStepsComponent,
            canActivate: [AuthGuard],
          },
          {
            path: '',
            component: RecipeListComponent,
          },
        ],
      },
      {
        path: 'chefs',
        children: [
          { path: ':chef_uuid', component: ChefDetailComponent },
          { path: ':chef_uuid/recipes', component: RecipeListComponent },
        ],
      },

      { path: 'r/:token', component: ShortlinkToRecipeComponent },

      { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
