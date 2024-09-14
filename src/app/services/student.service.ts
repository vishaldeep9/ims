import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient:HttpClient) {}
  
  createStudent(payload:any):Observable<any>
  {
    return this.httpClient.post('https://62b9299dff109cd1dc8ca34f.mockapi.io/students',payload);
  }

  getStudents():Observable<any>
  {
    return this.httpClient.get("https://62b9299dff109cd1dc8ca34f.mockapi.io/students");
  }

  deleteById(id:number){
     return this.httpClient.delete("https://62b9299dff109cd1dc8ca34f.mockapi.io/students/"+id);
  }
}
