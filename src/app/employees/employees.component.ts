import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddEmployeeComponent } from '../components/forms/add-employee/add-employee.component';
import { EmployeeModel } from '../models/employee.model';
import { EmployeesService } from '../services/employees.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: EmployeeModel[] = [];
  displayedColumns = ['id', 'name', 'last_name', 'birthday'];
  dataSource = new MatTableDataSource(this.employees);

  constructor(
    private employeesService: EmployeesService,
    public dialog: MatDialog,
  ) { }


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Empleados';
    this.dataSource.filterPredicate = (employees: EmployeeModel, filter: string) => {
      return employees.id.toString().toLowerCase().includes(filter) ||
        employees.last_name.toLowerCase().includes(filter) ||
        (employees.birthday).toString().includes(filter) ||
        employees.name.toLowerCase().includes(filter);
    };
    this.getEmployees();
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatDate(date: Date) {
    let formatDate = '';
    formatDate = `${date.getFullYear()}/${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    return formatDate
  }

  getEmployees() {
    this.employeesService.getAllEmployees('jorge').subscribe((response: any) => {
      console.log(response, 'response')
      response.data.employees.forEach((employeesResponse: any) => {
        const employees = new EmployeeModel();
        employees.id = employeesResponse.id;
        employees.name = employeesResponse.last_name;
        employees.last_name = employeesResponse.name;
        employees.birthday = (this.formatDate(new Date(employeesResponse.birthday))).toString();
        this.employees.push(employees)
      });
      this.dataSource.data = this.employees;
    })
  }

  addEmployee() {
    this.dialog.open(AddEmployeeComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
    }).afterClosed().subscribe((action) => {
      if (action === true)
        location.reload();
    });
  }

}
