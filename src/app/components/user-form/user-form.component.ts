import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from 'src/app/core/models/user.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/core/services/user/user.service';
import { TrackFormChangeDirective } from 'src/app/core/directives/track-form-change.directive';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    TrackFormChangeDirective
  ],
})
export class UserFormComponent implements OnInit {
  id!: string;
  userForm!: FormGroup<TForm>;
  user!: User;
  loading: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.formInitialization();
    this.route.params.subscribe({
      next: (response) => (this.id = response['id']),
    });
    this.id && this.getUser(this.id)
  }

  getUser(id: string): void {
    this.loading = true
    this.userService.getUser(id).subscribe({
      next: (res) => {
        this.user = res
        this.userForm.patchValue({...res})
      },
      error: (error) => {console.error(error)}
    })
  }

  submit(): void {
    console.log(this.userForm.value)
  }

  formInitialization(): void {
    const { min, maxLength, required, minLength, email } = Validators;

    this.userForm = this.fb.group<TForm>({
      name: this.fb.control(null, [required, minLength(3)]),
      email: this.fb.control(null, [required, email]),
      website: this.fb.control(null, [required, minLength(3)]),
      phone: this.fb.control(null, [required, minLength(8)]),
    });
  }
}

type TForm = {
  [field in keyof Pick<
    User,
    'name' | 'email' | 'website' | 'phone'
  >]: FormControl<User[field] | null>;
};
