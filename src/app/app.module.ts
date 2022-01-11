//Hassan ALYafai - Rihal Application challenge - 11/1/2022

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ClassCreateComponent,
  ClassSheetComponent,
  ClassItemComponent,
} from './components/class-components/class.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header-component/header.component';
import { StudentListComponent } from './components/studentList-component/studentList.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClassCreateComponent,
    ClassSheetComponent,
    StudentListComponent,
    ClassItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
