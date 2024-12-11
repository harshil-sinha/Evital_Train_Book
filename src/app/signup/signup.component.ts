import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  otpForm: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  userEmail: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
    });

    this.otpForm = this.fb.group({
      otp: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      let signupData = this.signupForm.getRawValue();

      const formattedDob = this.datePipe.transform(
        signupData.dob,
        'yyyy-MM-dd'
      );
      signupData.dob = formattedDob;

      this.userEmail = signupData.email;

      try {
        signupData = JSON.parse(JSON.stringify(signupData));
      } catch (error) {
        console.error('Error parsing signup data:', error);
      }

      this.http.post('http://localhost:4000/api/signup', signupData).subscribe({
        next: (response) => {
          // console.log('Signup successful:', response);

          Swal.fire({
            title: 'Success!',
            text: 'Signup successful. Please check your email for OTP.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.signupForm.reset();
          });

          this.otpSent = true;
        },
        error: (error) => {
          console.error('Signup error:', error);

          Swal.fire({
            title: 'Error!',
            text: 'Signup Failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    }
  }

  onVerifyOTP() {
    if (this.otpForm.valid) {
      let otpData = this.otpForm.getRawValue();

      otpData.email = this.userEmail;

      try {
        otpData = JSON.parse(JSON.stringify(otpData));
      } catch (error) {
        console.error('Error parsing OTP data:', error);
      }

      this.http
        .post('http://localhost:4000/api/verify_otp', otpData)
        .subscribe({
          next: (response) => {
            // console.log('OTP verification successful:', response);

            Swal.fire({
              title: 'Success!',
              text: 'OTP verified successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.otpVerified = true;
              this.router.navigate(['/login']);
            });
          },
          error: (error) => {
            console.error('OTP verification error:', error);

            Swal.fire({
              title: 'Error!',
              text: 'OTP verification failed. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
    }
  }
}
