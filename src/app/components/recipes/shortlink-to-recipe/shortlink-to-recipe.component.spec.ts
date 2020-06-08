import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlinkToRecipeComponent } from './shortlink-to-recipe.component';

describe('ShortlinkToRecipeComponent', () => {
  let component: ShortlinkToRecipeComponent;
  let fixture: ComponentFixture<ShortlinkToRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlinkToRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlinkToRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
