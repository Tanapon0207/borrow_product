import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourprofileComponent } from './yourprofile.component';

describe('YourprofileComponent', () => {
  let component: YourprofileComponent;
  let fixture: ComponentFixture<YourprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourprofileComponent]
    });
    fixture = TestBed.createComponent(YourprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
