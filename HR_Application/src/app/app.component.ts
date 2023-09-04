import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { AddDesignationComponent } from './add-designation/add-designation.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ListEmployeesComponent]
})
export class AppComponent {
  title = 'HumanResourcesUI';
  constructor(private dialog:MatDialog,private listOfEmps:ListEmployeesComponent)
  {}
  addEmployee()
  {
    this.dialog.open(AddEmployeeComponent,{
      width:'55%',
      height:'90%'
    } ).afterClosed().subscribe((val)=>{
      if(val==='save'){
        window.location.reload();
      }
    })
  }
  addDesignation()
  {
    this.dialog.open(AddDesignationComponent,{
      width:'25%',
      height:'32%'
    } ).afterClosed().subscribe((val)=>{
      if(val==='save'){
        window.location.reload();
      }
    })
  }
  
}
