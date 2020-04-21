import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStepsFormComponent } from './recipe-steps-form.component';

describe('RecipeStepsFormComponent', () => {
  let component: RecipeStepsFormComponent;
  let fixture: ComponentFixture<RecipeStepsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeStepsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStepsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
