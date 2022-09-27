import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomesComponent } from './incomes/incomes.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'ingresos', pathMatch: 'full' },
      { path: 'ingresos', component: IncomesComponent },
      { path: 'egresos', component: ExpensesComponent },
      { path: 'aplicaciones', component: ApplicationsComponent },
      { path: '**', redirectTo: 'ingresos', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
