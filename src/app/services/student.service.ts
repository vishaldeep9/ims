import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = 'https://62b9299dff109cd1dc8ca34f.mockapi.io/students';

  constructor(private httpClient: HttpClient) {}

  createStudent(payload: Signup): Observable<Signup[]> {
    return this.httpClient.post<Signup[]>(this.url, payload);
  }

  getStudents(): Observable<Signup[]> {
    return this.httpClient.get<Signup[]>(this.url);
  }

  deleteById(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }

  pagination(count: number, pageNo: number): Observable<Signup[]> {
    return this.httpClient.get<Signup[]>(
      this.url + '?limit=' + count + '&page=' + pageNo
    );
  }
  updatePage(count: number, pageNo: number): Observable<Signup[]> {
    return this.httpClient.get<Signup[]>(
      this.url + '?limit=' + count + '&page=' + pageNo
    );
  }
  sorting(column: string, order: string): Observable<Signup[]> {
    return this.httpClient.get<Signup[]>(
      this.url + '?sortBy=' + column + '&order=' + order
    );
  }
  filtering(text: string): Observable<Signup[]> {
    return this.httpClient.get<Signup[]>(this.url + '?filter=' + text);
  }
  getStudentById(id: number): Observable<Signup> {
    return this.httpClient.get<Signup>(this.url + '/' + id);
  }
  updateStudent(id: number, data: Signup): Observable<Signup> {
    return this.httpClient.put<Signup>(this.url + '/' + id, data);
  }
}
