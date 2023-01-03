import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ListEmployeesComponent } from '../list-employees/list-employees.component';
import { DesignationsService } from '../services/designations.service';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent {
  constructor(private designationService:DesignationsService, private formBuilder:FormBuilder,private dialogRef:MatDialogRef<AddEmployeeComponent>){}
  designationForm!:FormGroup;
  ngOnInit():void{
    this.designationForm=this.formBuilder.group({
      designationTitle: ['',[Validators.required]]
  })}
  addDesignation()
  {
    if(this.designationForm.valid)
    {
      console.log(this.designationForm.value);
      this.designationService.addDesignation(this.designationForm.value).subscribe({next:()=>{
        alert("Designation Added Successfully");
        this.designationForm.reset();
        this.dialogRef.close('save');
      }});
    }
  }
}
