import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users!: User[];
  postLoading = true;
  title = 'track-form-changes';
  displayedColumns: Array<keyof User> = ['name', 'phone', 'email', 'id'];
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.postLoading = true;
    this.userService
      .getUsers()
      .subscribe({
        next: (data) => {
          console.log("🚀 ~ file: app.component.ts:33 ~ AppComponent ~ getUsers ~ data:", data)
          this.users = data;
        },
        error: (error) => {
          console.log(error);
        },
      })
      .add(() => (this.postLoading = false));
  }
}
