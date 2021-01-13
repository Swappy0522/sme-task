import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Subject } from 'rxjs';
import { PostsData } from './posts.data.model';

const BACKEND_URL = environment.apiUrl + '/posts';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(public http: HttpClient, public router: Router) {}

  private categoryData: PostsData[] = [];
  private categoryDataUpdated = new Subject<{ Data: PostsData[] }>();

  createCategory(PostsName: string, PostsDescription: string) {
    const data: PostsData = {
      _id: null,
      PostsName: PostsName,
      PostsDescription: PostsDescription,
      IsActive: true,
      EnteredBy: null,
      WhenEntered: new Date(),
      ModifiedBy: null,
      WhenModified: null,
    };
    console.log(data);
    return this.http.post(BACKEND_URL + '/add', data);
  }

  getCategoryUpdateListener() {
    return this.categoryDataUpdated.asObservable();
  }

  getCategoryListdb() {
    this.http
      .get<{ message: string; Data: any }>(BACKEND_URL)
      .subscribe((transformedPostData) => {
        this.categoryData = transformedPostData.Data;
        this.categoryDataUpdated.next({
          Data: [...this.categoryData],
        });
      });
  }

  getActiveCategoryListdb() {
    this.http
      .get<{ message: string; Data: any }>(BACKEND_URL + '/getActivePosts')
      .subscribe((transformedPostData) => {
        this.categoryData = transformedPostData.Data;
        this.categoryDataUpdated.next({
          Data: [...this.categoryData],
        });
      });
  }

  getSingleCourseListdb(id: string) {
    return this.http.get<{ message: string; Data: PostsData }>(
      BACKEND_URL + '/' + id
    );
  }

  updateCourseDb(id: string, PostsName: string, PostsDescription: string) {
    const data: PostsData = {
      _id: id,
      PostsName: PostsName,
      PostsDescription: PostsDescription,
      IsActive: true,
      EnteredBy: null,
      WhenEntered: null,
      ModifiedBy: null,
      WhenModified: new Date(),
    };
    return this.http.put(BACKEND_URL + '/' + id, data);
  }

  deleteCategory(Eventid: string) {
    return this.http.delete(BACKEND_URL + '/' + Eventid);
  }

  UpdateCategoryStatus(id: string, status: boolean) {
    const data: PostsData = {
      _id: id,
      PostsName: null,
      PostsDescription: null,
      IsActive: status,
      EnteredBy: null,
      WhenEntered: null,
      ModifiedBy: null,
      WhenModified: new Date(),
    };
    return this.http.post(BACKEND_URL + '/updateStatus' + '/' + id, data);
  }

  getPostByText(SearchText: string) {
    const query = `?searchtext=${SearchText}`;
    return this.http.get<{ message: string; Data: PostsData }>(
      BACKEND_URL + '/search' + query
    );
  }
}
