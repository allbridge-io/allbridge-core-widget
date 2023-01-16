import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ChainsDialogComponent} from "./chains-dialog.component";


describe('ChainsDialogComponent', () => {
  let component: ChainsDialogComponent;
  let fixture: ComponentFixture<ChainsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainsDialogComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChainsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
