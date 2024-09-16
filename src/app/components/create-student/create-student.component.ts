import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent {
  public studentForm!: FormGroup;
  public id: number | undefined; // this is for edit form
  public isEdit: boolean = false; // this is for edit form

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      email: new FormControl('', Validators.required),
      batch: new FormControl(''),
      address: new FormGroup({
        city: new FormControl('', Validators.required),
        mandal: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pincode: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{6}$'),
        ]),
      }),
      education: new FormArray([]),
      company: new FormGroup({
        name: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
        package: new FormControl('', Validators.required),
        offerDate: new FormControl('', Validators.required),
      }),
      sourceType: new FormControl('', Validators.required),
    });
    //------for Form Type--------this is inside constructor
    this.studentForm.get('sourceType')?.valueChanges.subscribe((value) => {
      if (value == 'direct') {
        this.studentForm.addControl(
          'sourceFrom',
          new FormControl('', Validators.required)
        );
        this.studentForm.removeControl('referralName');
      } else {
        this.studentForm.addControl(
          'referralName',
          new FormControl('', Validators.required)
        );
        this.studentForm.removeControl('sourceFrom');
      }
    });
    //------for edit form--------this is inside constructor
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.isEdit = true;
        this.id = data['id'];
      } else {
        this.isEdit = false;
      }
      this.studentService.getStudentById(data['id']).subscribe((data) => {
        // this is for patch education details-->
        //here first we are opening add student box then later on patching education data
        for(let education of data.education){
          this.addStudent();
        }
        this.studentForm.patchValue(data);
      });
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
        percentage: new FormControl('', [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ]),
      })
    );
  }

  // -------Register Function----------------
  createStudent() {
    this.studentService.createStudent(this.studentForm.value).subscribe(
      (value) => {
        if (value) {
          alert(`Registration Successful`);
          this.studentForm.reset();
        }
      },
      (error) => {
        alert(`invalid credentials`);
      }
    );
  }
  updateStudent() {
    console.log(this.id);
    if (this.id) {
      this.studentService
        .updateStudent(this.id, this.studentForm.value)
        .subscribe(
          (result) => {
            alert(`updated successfully`);
            this.studentForm.reset();
          },
          (err) => {
            alert(err.error.error);
          }
        );
    }
  }
  delete(index: number) {
    this.eductionFormArray.removeAt(index);
  }
}
