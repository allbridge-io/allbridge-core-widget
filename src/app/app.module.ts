import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ChainSelectComponent} from "./component/chain-select/chain-select.component";
import {ToggleButtonComponent} from "./component/toggle-button/toggle-button.component";
import {MainButtonComponent} from "./component/main-button/main-button.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChainsDialogComponent} from "./component/chains-dialog/chains-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ChainLabelComponent } from './component/chain-label/chain-label.component';
import { TokenDataComponent } from './component/token-data/token-data.component';
import {FloatingNumberInputDirective} from "./directives/floating-number-input.directive";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    ChainSelectComponent,
    ToggleButtonComponent,
    MainButtonComponent,
    ChainsDialogComponent,
    ChainLabelComponent,
    TokenDataComponent,
    FloatingNumberInputDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
