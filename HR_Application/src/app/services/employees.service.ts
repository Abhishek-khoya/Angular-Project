import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseApiUrl:string="http://localhost:3000";
  constructor(private http:HttpClient ) { }
  getAllEmployees()
  {
    return this.http.get<Employee[]>(this.baseApiUrl+"/Employees")
  }
  addEmployee(addEmployeeRequest:Employee):Observable<Employee>
  {
    return this.http.post<Employee>(this.baseApiUrl+"/Employees",addEmployeeRequest); 
  }
  getEmployee(id:string):Observable<Employee>{
    return this.http.get<Employee>(this.baseApiUrl+"/Employees/"+id);
  }
  updateEmployee(id:number,updateEmployeeRequest:Employee ):Observable<Employee>
  {
    return this.http.put<Employee>(this.baseApiUrl+"/Employees/"+id,updateEmployeeRequest);
  }
  deleteEmployee(id:string):Observable<Employee>
  {
    return this.http.delete<Employee>(this.baseApiUrl+"/Employees/"+id);
  }
  getAllDesignations()
  {
    return this.http.get<any[]>(this.baseApiUrl+"/Designations")
  }
}
