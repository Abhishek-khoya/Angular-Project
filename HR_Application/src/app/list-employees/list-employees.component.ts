import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { DesignationsService } from '../services/designations.service';
import { EmployeesService } from '../services/employees.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','phoneNumber','hireDate','designation','salary','gender','isMarried','action'];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private employeeService:EmployeesService,private designationService:DesignationsService,private router:Router,private dialog:MatDialog){}
  designations:any[]=[];
  ngOnInit():void{
    this.getAllEmps();
    this.designationService.getAllDesignations().subscribe({
      next : (designations)=>{
        console.log(designations);
        this.designations=designations;
      },
      error : (response)=>{
        console.log(response);
      }
    })
  }
  getAllEmps()
  {
    this.employeeService.getAllEmployees().subscribe({
      next : (employees)=>{
        console.log(employees);
        this.dataSource=new MatTableDataSource(employees);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },
      error : (response)=>{
        console.log(response);
      }
    })
  }
  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editEmployee(row:Employee)
  {
    this.dialog.open(EditEmployeeComponent,{
      width:'auto',
      height:'auto',
      data:row
    } ).afterClosed().subscribe((val)=>{
      if(val==='update'){
        this.getAllEmps();
      }
    })
  }
  deleteEmployee(employee:any)
  {
    if(confirm('Are you sure ??'))
    {
      this.employeeService.deleteEmployee(employee.id).subscribe(data=>{
        alert("Employee Deleted!");
        this.getAllEmps();
      })
    }
  }

}


