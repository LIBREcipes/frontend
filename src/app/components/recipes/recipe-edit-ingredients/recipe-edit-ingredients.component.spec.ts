import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditIngredientsComponent } from './recipe-edit-ingredients.component';

describe('RecipeEditIngredientsComponent', () => {
  let component: RecipeEditIngredientsComponent;
  let fixture: ComponentFixture<RecipeEditIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
