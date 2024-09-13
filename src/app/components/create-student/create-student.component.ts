import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent  {
  public studentForm!: FormGroup;

  constructor() {}
  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      batch: new FormControl(''),
      address: new FormGroup({
        city: new FormControl(''),
        mandal: new FormControl(''),
        district: new FormControl(''),
        state: new FormControl(''),
        pincode: new FormControl(''),
      }),
      education: new FormArray([]),
      company:new FormGroup({
        name:new FormControl(),
        location:new FormControl(),
        package:new FormControl(),
        offerDate:new FormControl()
      }),
      sourceType:new FormControl(),
    });
  }
  //-------Form Array-----------------
  get eductionFormArray() {
    return this.studentForm.get('education') as FormArray;
  }
  addStudent() {
    this.eductionFormArray.push(
      new FormGroup({
        qualification: new FormControl(),
        year: new FormControl(),
        percentage: new FormControl(),
      })
    );
  }

  // -------Register Function----------------
  register() {
    console.log(this.studentForm.value);
    alert(`Registration Successful`);
  }
  delete(index:number){
    this.eductionFormArray.removeAt(index);
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

