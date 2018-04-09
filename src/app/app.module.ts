import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SelectComponent } from './select/select.component';
import { LevenshteinService } from 'simple-levenshtein';
import { SelectModule } from './select/select.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SelectModule
  ],
  providers: [
        LevenshteinService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
