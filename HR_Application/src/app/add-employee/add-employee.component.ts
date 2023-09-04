import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Designation } from '../models/designation.model';
import { Employee } from '../models/employee.model';
import { DesignationsService } from '../services/designations.service';
import { EmployeesService } from '../services/employees.service';
import { ListEmployeesComponent } from '../list-employees/list-employees.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers:[ListEmployeesComponent]
})
export class AddEmployeeComponent implements OnInit {
  constructor(private employeeService:EmployeesService,private designationService:DesignationsService,private router:Router, private formBuilder:FormBuilder,private listComponent:ListEmployeesComponent,private dialogRef:MatDialogRef<AddEmployeeComponent>){}
  employeeForm!:FormGroup;
  designations:Designation[]=[];
  addEmployeeRequest:Employee={
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    hireDate: "",
    designation: "",
    salary: 0,
    gender: '',
    isMarried: false
  }
  namePattern!:"^[a-zA-Z ]{2,20}$";
  ngOnInit():void{
    this.employeeForm=this.formBuilder.group({
      firstName: ['',[Validators.required,Validators.pattern(this.namePattern),Validators.maxLength(16),Validators.minLength(3)]],
      lastName: ['',[Validators.required,Validators.pattern(this.namePattern),Validators.maxLength(16),Validators.minLength(3)]],
      email : ['', [Validators.required, Validators.email]],
      phoneNumber:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      hireDate: ['',[Validators.required]],
      designation:['',[Validators.required]],
      gender: ['',[Validators.required]],
      salary: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      isMarried: ['',[Validators.required]],
    })
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
  
  addEmployee()
  {
    if(this.employeeForm.valid)
    {
      console.log(this.employeeForm.value);
      this.employeeService.addEmployee(this.employeeForm.value).subscribe({next:()=>{
        alert("Employee Added Successfully");
        this.employeeForm.reset();
        this.dialogRef.close('save');
      }});
    }
  }
}
