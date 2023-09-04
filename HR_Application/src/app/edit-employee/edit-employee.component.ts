import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Designation } from '../models/designation.model';
import { Employee } from '../models/employee.model';
import { DesignationsService } from '../services/designations.service';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  constructor(private dialogRef:MatDialogRef<AddEmployeeComponent>,@Inject(MAT_DIALOG_DATA) public editData:any,private employeeService:EmployeesService,private designationService:DesignationsService,private router:Router, private formBuilder:FormBuilder,private  route :ActivatedRoute){}
  employeeForm!:FormGroup;
  designations:Designation[]=[];
  employeeDetails :Employee={
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
  ngOnInit():void{
    this.employeeForm=this.formBuilder.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      phoneNumber:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      hireDate: ['',[Validators.required]],
      designation:['',[Validators.required]],
      gender: ['',[Validators.required]],
      salary: ['',[Validators.required,,Validators.minLength(5),Validators.maxLength(10)]],
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
    console.log(this.editData);
    if(this.editData)
    {
       this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
       this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
       this.employeeForm.controls['email'].setValue(this.editData.email);
       this.employeeForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
       this.employeeForm.controls['hireDate'].setValue(this.editData.hireDate);
       this.employeeForm.controls['designation'].setValue(this.editData.designation);
       this.employeeForm.controls['gender'].setValue(this.editData.gender);
       this.employeeForm.controls['salary'].setValue(this.editData.salary);
       this.employeeForm.controls['isMarried'].setValue(this.editData.isMarried);
    }
  }
  updateEmployee()
  {
    this.employeeDetails.id=this.editData.id
    this.employeeDetails.designation=this.employeeForm.value.designation;
    this.employeeDetails.email=this.employeeForm.value.email;
    this.employeeDetails.firstName=this.employeeForm.value.firstName;
    this.employeeDetails.lastName=this.employeeForm.value.lastName;
    this.employeeDetails.gender=this.employeeForm.value.gender;
    this.employeeDetails.hireDate=this.employeeForm.value.hireDate;
    this.employeeDetails.isMarried=this.employeeForm.value.isMarried;
    this.employeeDetails.phoneNumber=this.employeeForm.value.phoneNumber;
    this.employeeDetails.salary=this.employeeForm.value.salary;
    console.log(this.employeeDetails);
    this.employeeService.updateEmployee(this.editData.id,this.employeeDetails).subscribe({
      next:(res)=>{
        alert("Employee Updated Successfully");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{alert("Employee Not Updated")}
    }) 
  }
}
