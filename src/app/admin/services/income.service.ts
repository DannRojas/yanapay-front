import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomeModel } from 'src/app/domain/models/income.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  getAllIncomes(): Observable<IncomeModel[]> {
    let url: string = `${environment.apiUrl}/income`;
    return this.http.get<IncomeModel[]>(url);
  }

  getIncomebyId(id: string): Observable<IncomeModel> {
    let url: string = `${environment.apiUrl}/income/${id}`;
    return this.http.get<IncomeModel>(url);
  }

  saveIncome(income: IncomeModel): Observable<IncomeModel> {
    let url: string = `${environment.apiUrl}/income`;
    return this.http.post<IncomeModel>(url, income);
  }

  updateIncome(income: IncomeModel, id: string): Observable<IncomeModel> {
    let url: string = `${environment.apiUrl}/income/${id}`;
    return this.http.put<IncomeModel>(url, income);
  }

  deleteIncome(id: string): Observable<any> {
    let url: string = `${environment.apiUrl}/income/${id}`;
    return this.http.delete<any>(url);
  }
}
