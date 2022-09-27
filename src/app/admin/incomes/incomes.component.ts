import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IncomeModel } from 'src/app/domain/models/income.model';
import { UserModel } from 'src/app/domain/models/user.model';
import { IncomeService } from '../services/income.service';
import { IncomeFormComponent } from './income-form/income-form.component';
import { DialogComponent } from 'src/app/domain/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateHelper } from 'src/app/domain/helpers/date-helper';
import { GenerateReportService } from '../services/generate-report.service';
import { IncomeTypes } from 'src/app/domain/enums/income-types.enum';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
})
export class IncomesComponent implements OnInit {
  public inventoryesData: any;
  public columnsToDisplay = [
    'description',
    'type',
    'unitPrice',
    'units',
    'totalSale',
    'dateSale',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(IncomeFormComponent) incomeFormComponent!: IncomeFormComponent;
  public incomesData: any;
  public incomes!: IncomeModel[];
  public user!: UserModel;
  public IncomeTypes = IncomeTypes;

  public range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  constructor(
    private incomeService: IncomeService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private generateReportService: GenerateReportService
  ) {}

  ngOnInit(): void {
    this.listIncomes();
  }

  listIncomes() {
    this.incomeService.getAllIncomes().subscribe({
      next: (resp) => {
        this.incomes = resp;
        this.incomes.map((income) => (income.date = new Date(income.date!)));
        this.onFilterIncomes(false);
        this.incomesData.paginator = this.paginator;
        this.paginator._intl!.itemsPerPageLabel = 'Items por página';
      },
    });
  }

  onFilterIncomes(filter: boolean) {
    const filterIncomes: IncomeModel[] = [];
    if (filter) {
      let dateStart = new Date(
        moment(this.range.get('start')!.value).format('MM-DD-YYYY')
      );
      let dateEnd = new Date(
        moment(this.range.get('end')!.value).format('MM-DD-YYYY')
      );
      this.incomes.map((income) => {
        if (DateHelper.filterDate(dateStart, dateEnd, income.date!))
          filterIncomes.push(income);
      });
      this.incomesData = new MatTableDataSource<IncomeModel>(filterIncomes);
    } else {
      this.range.reset();
      this.incomesData = new MatTableDataSource<IncomeModel>(this.incomes);
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

  onUpdateIncome(selectedIncome: IncomeModel) {
    // console.log(selectedIncome);
    this.incomeFormComponent.resetForm();
    this.incomeFormComponent.mappingIncome(selectedIncome);
    this.incomeFormComponent.accordion.openAll();
    this.incomeFormComponent.isUpdate = true;
  }

  onDeleteIncome(income: IncomeModel) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        icon: 'highlight_off',
        title: `¿Está seguro de eliminar la venta ${income.name}?`,
        // description: 'Si acepta la venta se eliminará, este proceso no puede deshacerse.',
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (resp) => {
        if (resp) {
          this.incomeService.deleteIncome(income._id!).subscribe({
            next: (resp) => {
              this.toastrService.success(
                `La venta ${income.name} se ha eliminado satisfactoriamente.`,
                'Venta eliminada'
              );
              this.listIncomes();
            },
          });
        }
      },
    });
  }
}
