import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
  public studentForm!: FormGroup;

  constructor() {}
  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      batch: new FormControl(''),
    });
  }

  // -------Register Function----------------
  register(){
    console.log(this.studentForm.value);
  }
}
