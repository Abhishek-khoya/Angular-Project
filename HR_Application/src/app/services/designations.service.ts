import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation } from '../models/designation.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationsService {

  baseApiUrl:string="http://localhost:3000"
  constructor(private http:HttpClient ) { }
  getAllDesignations()
  {
    return this.http.get<any[]>(this.baseApiUrl+"/Designations")
  }
  addDesignation(addDesignationRequest:any):Observable<any>
  {
    return this.http.post<any>(this.baseApiUrl+"/Designations",addDesignationRequest); 
  }
  getDesignation(id:string):Observable<Designation>{
    return this.http.get<Designation>(this.baseApiUrl+"/Designations/"+id);
  }
  updateDesignation(id:number,updateDesignationRequest:Designation ):Observable<Designation>
  {
    return this.http.put<Designation>(this.baseApiUrl+"/Designations/"+id,updateDesignationRequest);
  }
  deleteDesignation(id:string):Observable<Designation>
  {
    return this.http.delete<Designation>(this.baseApiUrl+"/Designations/"+id);
  }
}
