import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from 'src/app/domain/dialog/dialog.component';
import { DateHelper } from 'src/app/domain/helpers/date-helper';
import { ExpenseModel } from 'src/app/domain/models/expense.model';
import { UserModel } from 'src/app/domain/models/user.model';
import { ExpenseService } from '../services/expense.service';
import { GenerateReportService } from '../services/generate-report.service';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  public inventoryesData: any;
  public columnsToDisplay = [
    'description',
    'type',
    'unitPrice',
    'units',
    'totalBuy',
    'dateBuy',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ExpenseFormComponent) expenseFormComponent!: ExpenseFormComponent;

  public expensesData: any;
  public expenses!: ExpenseModel[];
  public user!: UserModel;

  public range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  constructor(
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private generateReportService: GenerateReportService
  ) {}

  ngOnInit(): void {
    this.listExpenses();
  }

  listExpenses() {
    this.expenseService.getAllExpenses().subscribe({
      next: (resp) => {
        this.expenses = resp;
        this.expenses.map(
          (expense) => (expense.date = new Date(expense.date!))
        );
        this.onFilterExpenses(false);
        this.expensesData.paginator = this.paginator;
        this.paginator._intl!.itemsPerPageLabel = 'Items por página';
      },
    });
  }

  onFilterExpenses(filter: boolean) {
    const filterExpenses: ExpenseModel[] = [];
    if (filter) {
      let dateStart = new Date(
        moment(this.range.get('start')!.value).format('MM-DD-YYYY')
      );
      let dateEnd = new Date(
        moment(this.range.get('end')!.value).format('MM-DD-YYYY')
      );
      this.expenses.map((expense) => {
        if (DateHelper.filterDate(dateStart, dateEnd, expense.date!))
          filterExpenses.push(expense);
      });
      this.expensesData = new MatTableDataSource<ExpenseModel>(filterExpenses);
    } else {
      this.range.reset();
      this.expensesData = new MatTableDataSource<ExpenseModel>(this.expenses);
    }
  }

  async onDownloadReport() {
    let dateStart = new Date(
      moment(this.range.get('start')!.value).format('MM-DD-YYYY')
    );
    let dateEnd = new Date(
      moment(this.range.get('end')!.value).format('MM-DD-YYYY')
    );
    await this.generateReportService.generateReport(dateStart, dateEnd);
  }

  onUpdateExpense(selectedExpense: ExpenseModel) {
    // console.log(selectedIncome);
    this.expenseFormComponent.resetForm();
    this.expenseFormComponent.mappingExpense(selectedExpense);
    this.expenseFormComponent.accordion.openAll();
    this.expenseFormComponent.isUpdate = true;
  }

  onDeleteExpense(expense: ExpenseModel) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        icon: 'highlight_off',
        title: `¿Está seguro de eliminar el pago ${expense.name}?`,
        // description: 'Si acepta, la compra se eliminará. Este proceso no puede deshacerse.',
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (resp) => {
        if (resp) {
          this.expenseService.deleteExpense(expense._id!).subscribe({
            next: (resp) => {
              this.toastrService.success(
                `El pago ${expense.name} se ha eliminado satisfactoriamente.`,
                'Pago eliminado'
              );
              this.listExpenses();
            },
          });
        }
      },
    });
  }
}
