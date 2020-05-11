import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStepFieldComponent } from './recipe-step-field.component';

describe('RecipeStepFieldComponent', () => {
  let component: RecipeStepFieldComponent;
  let fixture: ComponentFixture<RecipeStepFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeStepFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStepFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
