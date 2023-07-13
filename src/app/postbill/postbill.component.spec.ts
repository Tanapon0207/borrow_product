import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBillComponent } from './postbill.component';

describe('PostBillComponent', () => {
  let component: PostBillComponent;
  let fixture: ComponentFixture<PostBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostBillComponent]
    });
    fixture = TestBed.createComponent(PostBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
