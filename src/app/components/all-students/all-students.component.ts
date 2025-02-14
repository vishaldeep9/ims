import { Signup } from './../../models/signup';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import {faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss'],
})
export class AllStudentsComponent {
  studentForm: Signup[] = [];
  public count: number | undefined;
  public pageNo: number | undefined;
  isVisible: boolean = false;
  public column: string = '';
  public order: string = '';
  public text: string = '';
 deleteIcon=faTrash;
 viewIcon=faEye;
 editIcon=faPenToSquare

  constructor(private studentService: StudentService,private router:Router) {}
  ngOnInit(): void {
    this.getStudents();
  }

  delete(id: number) {
    this.studentService.deleteById(id).subscribe(
      (result) => {
        alert(`delete successful`);
        this.getStudents();
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }

  pagination() {
    // this is for typing from keyboard side restricting
    this.count = this.count && this.count < 1 ? 1 : this.count;
    this.pageNo = this.pageNo && this.pageNo < 1 ? 1 : this.pageNo;

    if (this.count && this.pageNo) {
      this.studentService.pagination(this.count, this.pageNo).subscribe(
        (data) => {
          this.studentForm = data;
          this.isVisible = true;
        },
        (error) => {
          alert(error.error.error);
        }
      );
    }
  }

  sorting() {
    this.studentService.sorting(this.column, this.order).subscribe(
      (data) => {
        this.studentForm = data;
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }

  filtering() {
    this.studentService.filtering(this.text).subscribe(
      (data) => {
        this.studentForm = data;
      },
      (error) => {
        console.log(error.error.error);
      }
    );
  }

  updatePage(value: string) {
    // here only previous function will when value will be greater than 1
    if (value == 'previous' && this.pageNo && this.pageNo > 1) {
      this.pageNo && this.pageNo--;
      this.handlePageUpdate();
    } else if (value == 'next') {
      this.pageNo && this.pageNo++;
      this.handlePageUpdate();
    }
  }

  view(id:number){
    this.router.navigateByUrl(`dashboard/student-details/${id}`);
  }

  edit(id:number){
    this.router.navigateByUrl(`dashboard/edit-student/${id}`);
  }

  handlePageUpdate() {
    if (this.count && this.pageNo) {
      this.studentService.updatePage(this.count, this.pageNo).subscribe(
        (data) => {
          this.studentForm = data;
        },
        (error) => {
          alert(error.error.error);
        }
      );
    }
  }
  getStudents() {
    this.studentService.getStudents().subscribe(
      (data) => {
      this.studentForm=data.map((stu)=>(
        {
          ...stu,
          package:stu.company?.package 
        }
      ))
      },
      (error) => {
        alert(`internal server error`);
      }
    );
  }
}
