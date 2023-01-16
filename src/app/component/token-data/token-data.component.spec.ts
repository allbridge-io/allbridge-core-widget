import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDataComponent } from './token-data.component';

describe('TokenDataComponent', () => {
  let component: TokenDataComponent;
  let fixture: ComponentFixture<TokenDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
