import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WpTableComponent } from './wp-table/wp-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MapsSectionComponent } from './maps-section/maps-section.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    WpTableComponent,
    HeaderComponent,
    MapsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    OverlayModule,
    MatButtonModule,
    MatDividerModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
