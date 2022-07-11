import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {}

  // employees
  getAllEmployees(userName: string) {
    return this.http.get(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/${userName}`);
  }
  
  addEmployee(userName: string, employee: EmployeeModel) {
    return this.http.post(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/${userName}`, employee);
  }

  // groups
  getAllGroups(userName: string) {
    return this.http.get(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/groups/${userName}`);
  }

  getEmployeesByGroupId(userName: string, id: number) {
    const qparams = new HttpParams()
    .set("id", id)
    return this.http.get(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/${userName}/getByGroup`, {
        params: qparams
    });
  }
}
