import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditStepsComponent } from './recipe-edit-steps.component';

describe('RecipeEditStepsComponent', () => {
  let component: RecipeEditStepsComponent;
  let fixture: ComponentFixture<RecipeEditStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
