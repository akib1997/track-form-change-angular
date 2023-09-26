import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly paths = {
    post: `${environment.api}/post`,
    posts: `${environment.api}/posts`,
  };
  constructor(private httpClient: HttpClient) {}

  getPost(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`${this.paths.post}${id}`);
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.paths.posts}}`);
  }
}
