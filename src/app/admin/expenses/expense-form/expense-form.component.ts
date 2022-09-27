import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ExpenseTypes } from 'src/app/domain/enums/expense-types.enum';
import { ExpenseModel } from 'src/app/domain/models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public ExpenseTypes = ExpenseTypes;
  public expenseForm!: FormGroup;
  public isUpdate: boolean = false;

  public idExpense!: string;

  @ViewChild('formDirective')
  formDirective!: NgForm;

  @Output() reloadTable = new EventEmitter<boolean>();

  constructor(
    private expenseService: ExpenseService,
    private toastrService: ToastrService
  ) {
    this.buildExpenseForm();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.isUpdate) {
      this.expenseService.saveExpense(this.expenseForm.value).subscribe({
        next: (resp) => {
          this.toastrService.success(
            `El pago ${resp.name} se ha agregado satisfactoriamente`,
            'Pago agregado'
          );
          this.isUpdate = false;
          this.accordion.closeAll();
          this.reloadTable.emit(true);
        },
      });
    } else {
      this.expenseService
        .updateExpense(this.expenseForm.value, this.idExpense)
        .subscribe({
          next: (resp) => {
            this.toastrService.success(
              `El pago ${resp.name} se ha modificado satisfactoriamente`,
              'Pago modificado'
            );
            this.isUpdate = false;
            this.accordion.closeAll();
            this.reloadTable.emit(true);
          },
        });
    }
  }

  resetForm() {
    this.isUpdate = false;
    this.expenseForm.reset();
    this.formDirective.resetForm();
    this.buildExpenseForm();
  }

  resetTotalBuy() {
    let totalBuy: number =
      this.expenseForm.get('unitPrice')?.value *
      this.expenseForm.get('units')?.value;
    this.expenseForm.get('totalBuy')?.setValue(totalBuy);
  }

  mappingExpense(expense: ExpenseModel) {
    this.idExpense = expense._id!;
    this.expenseForm.get('name')?.setValue(expense.name);
    this.expenseForm.get('type')?.setValue(expense.type);
    this.expenseForm.get('unitPrice')?.setValue(expense.unitPrice);
    this.expenseForm.get('units')?.setValue(expense.units);
    this.expenseForm.get('totalBuy')?.setValue(expense.totalBuy);
    this.expenseForm.get('date')?.setValue(expense.date);
  }

  buildExpenseForm() {
    this.expenseForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      type: new FormControl('', Validators.required),
      unitPrice: new FormControl(1, [Validators.required, Validators.min(1)]),
      units: new FormControl(1, [Validators.required, Validators.min(1)]),
      totalBuy: new FormControl(1, [Validators.required, Validators.min(1)]),
      date: new FormControl(moment(), [Validators.required]),
    });
  }
}
