import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteIngredientComponent } from './autocomplete-ingredient.component';

describe('AutocompleteIngredientComponent', () => {
  let component: AutocompleteIngredientComponent;
  let fixture: ComponentFixture<AutocompleteIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
