import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GroupModel } from '../models/group.model';
import { EmployeesService } from '../services/employees.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EmployeeModel } from '../models/employee.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: GroupModel[] = [];
  employees: any[] = [];
  printEmployees: any[] = [];
  container: any [] = [];
  index = 0
  array: any = []
  dummy = 0;
  selectedList: any[] = [];
  availableList: any[] = [];
  selectedFilterText: string = '';
  availableFilterText: string = '';

  checkFormContrl = new FormControl('', [
  ]);

  employeesForm = new FormGroup({
    check: this.checkFormContrl
  });
  
  constructor(
    private employeesService: EmployeesService) { }


  ngOnInit(): void {
    this.getGroups()
  }

  getGroups() {
    this.employeesService.getAllGroups('jorge').subscribe((response: any) => {
      if (response.data.groups.length > 0) {
        response.data.groups.forEach((groupsResponse: any) => {
          const groups = new GroupModel();
          groups.id = groupsResponse.id;
          groups.name = groupsResponse.name;
          groups.group = groupsResponse.name;
          this.groups.push(groups)
        });
      } else {
      }
    })
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.container.push(event.item.data)
      this.getEmployeesById(event.previousIndex)
    }
  }

  formatDate(date: Date) {
    let formatDate = '';
    formatDate = `${date.getFullYear()}/${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    return formatDate
  }

  getEmployeesById(groupId: number) {
    this.employees = []
    this.employeesService.getEmployeesByGroupId('jorge', groupId).subscribe((response: any) => {
      response.data.employees.forEach((employeesResponse: any) => {
        const employees:any = [];
        employees.id = employeesResponse.id;
        employees.name = employeesResponse.last_name;
        employees.last_name = employeesResponse.name;
        this.employees.push(employees)
      });
      this.array[this.index] = this.employees;
      this.index = this.index + 1;
    })
  }

  setEmployees(name:any, event: any) {
    if (event === true) {
      this.printEmployees.push(name)
    }
  }

  showEmployees() {
    this.printEmployees.forEach(name => {
      console.log(name.last_name, 'empleados')
    })
  }

}
