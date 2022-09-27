export class ExpenseModel {
  public _id?: string;
  public name?: string;
  public type?: string;
  public unitPrice?: number;
  public units?: number;
  public totalBuy?: number;
  public date?: Date;
  public userId?: string;

  constructor(
    _id: string,
    name: string,
    type: string,
    unitPrice: number,
    units: number,
    totalBuy: number,
    date: Date,
    userId: string
  ) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.unitPrice = unitPrice;
    this.units = units;
    this.totalBuy = totalBuy;
    this.date = date;
    this.userId = userId;
  }
}
