import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component'
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component'
import { ChefDetailComponent } from './components/chefs/chef-detail/chef-detail.component'
import { LoginComponent } from './components/auth/login/login.component'
import { MainComponent } from './components/partial/main/main.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'recipes', component: RecipeListComponent },
      { path: 'recipes/:recipe_uuid', component: RecipeDetailComponent },

      { path: 'chefs/:chef_uuid', component: ChefDetailComponent },
      { path: 'chefs/:chef_uuid/recipes', component: RecipeListComponent },

      { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
