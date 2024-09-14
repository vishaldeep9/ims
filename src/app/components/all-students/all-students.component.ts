import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss'],
})
export class AllStudentsComponent {
  studentForm: any = [];

  constructor(private studentService: StudentService) {}
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

  getStudents() {
    this.studentService.getStudents().subscribe(
      (data) => {
        console.log(data);
        this.studentForm = data;
      },
      (error) => {
        alert(`internal server error`);
      }
    );
  }
}
