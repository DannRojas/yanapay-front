import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseModel } from 'src/app/domain/models/expense.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<ExpenseModel[]> {
    let url: string = `${environment.apiUrl}/expense`;
    return this.http.get<ExpenseModel[]>(url);
  }

  getExpenseById(id: string): Observable<ExpenseModel> {
    let url: string = `${environment.apiUrl}/expense/${id}`;
    return this.http.get<ExpenseModel>(url);
  }

  saveExpense(expense: ExpenseModel): Observable<ExpenseModel> {
    let url: string = `${environment.apiUrl}/expense`;
    return this.http.post<ExpenseModel>(url, expense);
  }

  updateExpense(expense: ExpenseModel, id: string): Observable<ExpenseModel> {
    let url: string = `${environment.apiUrl}/expense/${id}`;
    return this.http.put<ExpenseModel>(url, expense);
  }

  deleteExpense(id: string): Observable<any> {
    let url: string = `${environment.apiUrl}/expense/${id}`;
    return this.http.delete<any>(url);
  }
}
