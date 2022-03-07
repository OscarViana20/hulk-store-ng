import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,    
    private router: Router,    
    private _snackBar: MatSnackBar,  ) {
    this.form = this.fb.group({
      name: ['', Validators.required, Validators.minLength(5)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ingresar() {
    this.fakeLoading();
  }
  
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 10);
  }

  /*validatePasswords(): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.get('password')?.value !== control.get('confirm_password')?.value) {
        return {invalid: true};
      }
    };
  }*/

}
