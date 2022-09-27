import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IncomeTypes } from '../../../domain/enums/income-types.enum';
import { IncomeService } from '../../services/income.service';
import { MatAccordion } from '@angular/material/expansion';
import { IncomeModel } from 'src/app/domain/models/income.model';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public IncomeTypes = IncomeTypes;
  public incomeForm!: FormGroup;
  public isUpdate: boolean = false;

  public idIncome!: string;

  @ViewChild('formDirective')
  formDirective!: NgForm;

  @Output() reloadTable = new EventEmitter<boolean>();

  constructor(
    private incomeService: IncomeService,
    private toastrService: ToastrService
  ) {
    this.buildIncomeForm();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.isUpdate) {
      this.incomeService.saveIncome(this.incomeForm.value).subscribe({
        next: (resp) => {
          this.toastrService.success(
            `La venta ${resp.name} se ha agregado satisfactoriamente`,
            'Venta agregada'
          );
          this.isUpdate = false;
          this.accordion.closeAll();
          this.reloadTable.emit(true);
        },
      });
    } else {
      this.incomeService
        .updateIncome(this.incomeForm.value, this.idIncome)
        .subscribe({
          next: (resp) => {
            this.toastrService.success(
              `La venta ${resp.name} se ha modificado satisfactoriamente`,
              'Venta modificada'
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
    this.incomeForm.reset();
    this.formDirective.resetForm();
    this.buildIncomeForm();
  }

  resetTotalSale() {
    let totalSale: number =
      this.incomeForm.get('unitPrice')?.value *
      this.incomeForm.get('units')?.value;
    this.incomeForm.get('totalSale')?.setValue(totalSale);
  }

  mappingIncome(income: IncomeModel) {
    this.idIncome = income._id!;
    this.incomeForm.get('name')?.setValue(income.name);
    this.incomeForm.get('type')?.setValue(income.type);
    this.incomeForm.get('unitPrice')?.setValue(income.unitPrice);
    this.incomeForm.get('units')?.setValue(income.units);
    this.incomeForm.get('totalSale')?.setValue(income.totalSale);
    this.incomeForm.get('date')?.setValue(income.date);
  }

  buildIncomeForm() {
    this.incomeForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      type: new FormControl('', Validators.required),
      unitPrice: new FormControl(1, [Validators.required, Validators.min(1)]),
      units: new FormControl(1, [Validators.required, Validators.min(1)]),
      totalSale: new FormControl(1, [Validators.required, Validators.min(1)]),
      date: new FormControl(moment(), [Validators.required]),
    });
  }
}
