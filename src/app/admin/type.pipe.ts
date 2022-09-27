import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  transform(value: any): unknown {
    switch (value) {
      case 'CashSales':
        return 'Ventas en efectivo';
        break;
      case 'CreditSales':
        return 'Cobros por ventas a crédito';
        break;
      case 'OtherSales':
        return 'Otros ingresos de dinero';
        break;
      case 'PurchaseMaterials':
        return 'Compra de materia prima e insumos';
        break;
      case 'PurchaseMachinery':
        return 'Compra de maquinaria en efectivo';
        break;
      case 'DebtPayment':
        return 'Pago de deudas en efectivo';
        break;
      case 'RentPayment':
        return 'Pago de alquiler';
        break;
      case 'PaymentSalaries':
        return 'Pago de sueldos y salarios';
        break;

      default:
        return null;
        break;
    }
    return null;
  }
}
