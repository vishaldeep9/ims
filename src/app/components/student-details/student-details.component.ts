import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Signup } from 'src/app/models/signup';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  public student: Signup | undefined;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.studentService.getStudentById(data['id']).subscribe(
        (data) => {
          this.student = data;
        },
        (err) => {
          alert(err.error.error);
        }
      );
    });
  }
}
