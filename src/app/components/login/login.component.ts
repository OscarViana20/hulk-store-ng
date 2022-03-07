import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/login/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthServiceService) {
    this.form = this.fb.group({
        name: ['', Validators.required],
        password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loading = true;
    const name = this.form.value.name;
    const password = this.form.value.password;
    this.authService.login(name, password)
      .subscribe(response => {
        localStorage.setItem('token', response.headers.get('Authorization'));
        localStorage.setItem('userName', name);
        this.router.navigate(['dashboard']);
      }, (error) => {
        console.log('error', error);
        this.error();
      });
  }

  error() {
    this.loading = false;
    this._snackBar.open('Name or password invalid!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 10);
  }

}
