import { Component, OnInit } from '@angular/core';
import { Post } from './core/models/post.model';
import { User } from './core/models/user.model';
import { PostService } from './core/services/post/post.service';
import { UserService } from './core/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  posts!: Post[];
  users!: User[];
  postLoading = true;
  title = 'track-form-changes';
  displayedColumns: Array<keyof User> = ['name', 'phone', 'email', 'id'];
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.getUsers();
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

  getPosts(): void {
    this.postLoading = true;
    this.postService
      .getPosts()
      .subscribe({
        next: (data) => {
          this.posts = data;
        },
        error: (error) => {
          console.log(error);
        },
      })
      .add(() => (this.postLoading = false));
  }
}
