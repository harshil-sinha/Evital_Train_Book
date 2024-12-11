import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.getRawValue();
      this.http.post('http://localhost:4000/api/login', loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          Swal.fire({
            title: 'Success!',
            text: 'You have logged in successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.loginForm.reset();
          });
        },
        error: (error) => {
          console.error('Login error:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Login failed.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      Swal.fire({
        title: 'Question!',
        text: 'Please fill in all required fields..',
        icon: 'question',
        confirmButtonText: 'OK',
      });
    }
  }
}
