import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent {
  public studentForm!: FormGroup;

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required),
      mobile: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      batch: new FormControl(''),
      address: new FormGroup({
        city: new FormControl('',Validators.required),
        mandal: new FormControl('',Validators.required),
        district: new FormControl('',Validators.required),
        state: new FormControl('',Validators.required),
        pincode: new FormControl('',Validators.required),
      }),
      education: new FormArray([]),
      company: new FormGroup({
        name: new FormControl('',Validators.required),
        location: new FormControl('',Validators.required),
        package: new FormControl('',Validators.required),
        offerDate: new FormControl('',Validators.required),
      }),
      sourceType: new FormControl('',Validators.required),
    });

    //------for Form Type--------
    this.studentForm.get('sourceType')?.valueChanges.subscribe((value) => {
      if (value == 'direct') {
        this.studentForm.addControl('sourceFrom', new FormControl('',Validators.required));
        this.studentForm.removeControl('referralName');
      } else {
        this.studentForm.addControl('referralName', new FormControl('',Validators.required));
        this.studentForm.removeControl('sourceFrom');
      }
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
  delete(index: number) {
    this.eductionFormArray.removeAt(index);
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}
