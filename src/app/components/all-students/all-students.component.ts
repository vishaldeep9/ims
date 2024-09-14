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
  ngOnInit():void
  {
    this.getStudents();
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
