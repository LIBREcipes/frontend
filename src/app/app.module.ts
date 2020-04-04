import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { PluckPipe } from './pipes/pluck.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { EllipsisJoinPipe } from './pipes/ellipsis-join.pipe';
import { CapFirstPipe } from './pipes/cap-first.pipe';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { HeroComponent } from './partial/hero/hero.component';
import { BulmaDropdownComponent } from './partial/bulma-dropdown/bulma-dropdown.component';
import { ChefComponent } from './chefs/chef/chef.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
