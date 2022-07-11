import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  isLoading = false;
  nameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required])
  birthdayFormControl = new FormControl('', [Validators.required])

  addEmployeeFormGroup = new FormGroup({
    name: this.nameFormControl,
    lastName: this.lastNameFormControl,
    birthday: this.birthdayFormControl
  })
  
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeesService: EmployeesService, ) { }

  ngOnInit(): void {
  }

  formatDate(date: Date) {
    let formatDate = '';
    formatDate = `${date.getFullYear()}/${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    return formatDate
  }

  addEmployee() {
    const employee = new EmployeeModel();
    employee.name = this.nameFormControl.value;
    employee.last_name = this.lastNameFormControl.value;
    employee.birthday = this.formatDate(this.birthdayFormControl.value);
    this.employeesService.addEmployee('jorge', employee).subscribe(() => {
      this.dialogRef.close(true);
    })
  }

}
