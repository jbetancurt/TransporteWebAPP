import {NgModule} from '@angular/core';

import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatGridTile } from '@angular/material/grid-list';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatTreeModule } from "@angular/material/tree";
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatTreeModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatTreeModule,
    MatTableModule,
    MatDialogModule,
    MatGridTile,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
