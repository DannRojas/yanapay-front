import { Injectable } from '@angular/core';
import {
  PdfMakeWrapper,
  Txt,
  Img,
  Table,
  Cell,
  Columns,
  Ul,
} from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ExpenseService } from './expense.service';
import { IncomeService } from './income.service';
import { IncomeModel } from 'src/app/domain/models/income.model';
import { ExpenseModel } from 'src/app/domain/models/expense.model';
import { DateHelper } from 'src/app/domain/helpers/date-helper';
import { AuthService } from 'src/app/login/services/auth.service';
import { UserModel } from 'src/app/domain/models/user.model';

PdfMakeWrapper.setFonts(pdfFonts);

@Injectable({
  providedIn: 'root',
})
export class GenerateReportService {
  //Data
  private user!: UserModel;
  private incomes: IncomeModel[] = [];
  private expenses: ExpenseModel[] = [];

  //Incomes
  private cashSales: number = 0;
  private creditSales: number = 0;
  private otherSales: number = 0;
  private totalSales: number = 0;

  //Expenses
  private purchaseMaterials: number = 0;
  private purchaseMachinery: number = 0;
  private debtPayment: number = 0;
  private rentPayment: number = 0;
  private paymentSalaries: number = 0;
  private paymentServices: number = 0;
  private otherExpenses: number = 0;
  private totalBuys: number = 0;

  //Totals
  private totalCashFlow: number = 0;
  private total: number = 0;

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    private authService: AuthService
  ) {}

  async generateReport(dateStart: Date, dateEnd: Date) {
    await this.getData(dateStart, dateEnd);
    this.setInfo();

    const pdf = new PdfMakeWrapper();
    pdf.pageSize('Letter');
    pdf.pageOrientation('portrait');
    // pdf.pageOrientation('landscape');
    pdf.pageMargins([30, 15]);

    pdf.info({
      title: 'Reporte',
      author: 'Yanapay-net',
      subject: 'Reporte de caja',
    });

    pdf.styles({
      title: {
        fontSize: 18,
        bold: true,
      },
    });

    pdf.add([
      await new Img('assets/img/logo.png')
        .height(90)
        .width(105)
        .alignment('center')
        .build(),
      new Txt('Yanapay-Net')
        .style('title')
        .bold()
        .color('#37b2b6')
        .alignment('center').end,
    ]);

    pdf.add(
      new Cell(
        new Ul([
          new Txt(`EMPRESA: ${this.user.business}`).end,
          new Txt(
            `PROPIETARIO: ${this.user.names} ${this.user.firstName} ${this.user.lastName}`
          ).end,
          new Txt(`CORREO ELECTRÓNICO: ${this.user.email}`).end,
          new Txt(`FECHA DEL REPORTE: ${new Date().toLocaleDateString()}`).end,
          new Txt(
            `RANGO DE FECHAS DEL REPORTE: Del ${dateStart.toLocaleDateString()} al ${dateEnd.toLocaleDateString()}`
          ).end,
        ]).type('none').end
      ).end
    );

    pdf.add([
      // new Txt(`INGRESOS`).bold().end,
      // pdf.ln(0),

      new Table([
        [
          new Table([
            [
              new Cell(new Txt('Tipos de Ingresos').bold().end).fillColor(
                '#dbd9d9'
              ).end,
              new Cell(new Txt('Monto').bold().end).fillColor('#dbd9d9').end,
            ],
            ['Ventas en efectivo:', this.cashSales + ' Bs.'],
            ['Cobros por ventas a crédito:', this.creditSales + ' Bs.'],
            ['Otros ingresos de dinero:', this.otherSales + ' Bs.'],
            [new Txt('Total ingresos: ').bold().end, this.totalSales + ' Bs.'],
          ])
            .margin([50, 10])
            .widths([110, 70])
            .dontBreakRows(true).end,

          new Table([
            [
              new Cell(new Txt('Tipos de Egresos').bold().end).fillColor(
                '#dbd9d9'
              ).end,
              new Cell(new Txt('Monto').bold().end).fillColor('#dbd9d9').end,
            ],
            [
              'Compra de materia prima e insumos:',
              this.purchaseMaterials + ' Bs.',
            ],
            [
              'Compra de maquinaria en efectivo:',
              this.purchaseMachinery + ' Bs.',
            ],
            ['Pago de deudas en efectivo:', this.debtPayment + ' Bs.'],
            ['Pago de alquiler:', this.rentPayment + ' Bs.'],
            ['Pago de sueldos y salarios:', this.paymentSalaries + ' Bs.'],
            ['Pago de servicios:', this.paymentServices + ' Bs.'],
            ['Otros egresos:', this.otherExpenses + ' Bs.'],
            [new Txt('Total egresos: ').bold().end, this.totalBuys + ' Bs.'],
          ])
            .margin([75, 10])
            .widths([110, 70])
            .dontBreakRows(true).end,
        ],
      ])
        .layout('noBorders')
        .widths([200, 150])
        .dontBreakRows(true).end,

      // new Columns([

      // ]),
    ]),
      pdf.add(
        new Table([
          [
            new Cell(new Txt('Totales').bold().end).fillColor('#dbd9d9').end,
            new Cell(new Txt('Monto').bold().end).fillColor('#dbd9d9').end,
          ],
          ['Total ingresos:', this.totalSales + ' Bs.'],
          ['Total egresos:', this.totalBuys + ' Bs.'],
          [
            new Txt('Flujo neto de caja: ').bold().end,
            this.totalSales - this.totalBuys + ' Bs.',
          ],
        ])
          .margin([180, 10])
          // .alignment('center')
          .widths([110, 70])
          .dontBreakRows(true).end
      );
    pdf.create().download(`Reporte Yanapay-Net`);
  }

  async getData(dateStart: Date, dateEnd: Date) {
    //Incomes
    this.incomes = [];
    let incomes = await this.incomeService.getAllIncomes().toPromise();
    incomes?.map((income) => {
      income.date = new Date(income.date!);
      if (DateHelper.filterDate(dateStart, dateEnd, income.date!))
        this.incomes.push(income);
    });
    //Expenses
    this.expenses = [];
    let expenses = await this.expenseService.getAllExpenses().toPromise();
    expenses?.map((expense) => {
      expense.date = new Date(expense.date!);
      if (DateHelper.filterDate(dateStart, dateEnd, expense.date!))
        this.expenses.push(expense);
    });

    this.user = this.authService.getUserData()!;
  }

  setInfo() {
    //incomes
    this.cashSales = this.sumatoryIncomes('CashSales');
    this.creditSales = this.sumatoryIncomes('CreditSales');
    this.otherSales = this.sumatoryIncomes('OtherSales');
    this.totalSales = this.cashSales + this.creditSales + this.otherSales;

    //Expenses
    this.purchaseMaterials = this.sumatoryExpenses('PurchaseMaterials');
    this.purchaseMachinery = this.sumatoryExpenses('PurchaseMachinery');
    this.debtPayment = this.sumatoryExpenses('DebtPayment');
    this.rentPayment = this.sumatoryExpenses('RentPayment');
    this.paymentSalaries = this.sumatoryExpenses('PaymentSalaries');
    this.paymentServices = this.sumatoryExpenses('PaymentServices');
    this.otherExpenses = this.sumatoryExpenses('OtherExpenses');
    this.totalBuys =
      this.purchaseMaterials +
      this.purchaseMachinery +
      this.debtPayment +
      this.rentPayment +
      this.paymentSalaries +
      this.paymentServices +
      this.otherExpenses;
  }

  sumatoryIncomes(category: string): number {
    let sum: number = 0;
    this.incomes.map((income) => {
      if (income.type === category) {
        sum = sum + income.totalSale!;
      }
    });
    return sum;
  }

  sumatoryExpenses(category: string): number {
    let sum: number = 0;
    this.expenses.map((expense) => {
      if (expense.type === category) {
        sum = sum + expense.totalBuy!;
      }
    });
    return sum;
  }
}
