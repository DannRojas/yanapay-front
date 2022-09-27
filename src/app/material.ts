//Angular core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

const myModule = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatSelectModule,
  MatRadioModule,
  MatSortModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatTabsModule,
  MatMenuModule,
  MatExpansionModule,
  MatDialogModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule],
})
export class MaterialModule {}
