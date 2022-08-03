import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategoryPostsComponent } from './single-category-posts.component';

describe('SingleCategoryPostsComponent', () => {
  let component: SingleCategoryPostsComponent;
  let fixture: ComponentFixture<SingleCategoryPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCategoryPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCategoryPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
