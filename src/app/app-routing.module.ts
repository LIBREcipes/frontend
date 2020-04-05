import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ChefComponent } from './chefs/chef/chef.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './partial/main/main.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: MainComponent, children: [
    { path: 'recipes', component: RecipeListComponent, },
    { path: 'recipes/:recipe_uuid', component: RecipeDetailComponent},

    { path: 'chefs/:chef_uuid', component: ChefComponent, },
    { path: 'chefs/:chef_uuid/recipes', component: RecipeListComponent, },

    { path: '', redirectTo: '/recipes', pathMatch: 'full', },
  ],}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
