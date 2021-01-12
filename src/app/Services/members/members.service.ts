import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Subject } from 'rxjs';
import { MembersData } from './members.data.model';

const BACKEND_URL = environment.apiUrl + '/members';

@Injectable({ providedIn: 'root' })
export class MemberService {
  constructor(public http: HttpClient, public router: Router) {}

  private categoryData: MembersData[] = [];
  private categoryDataUpdated = new Subject<{ Data: MembersData[] }>();

  createCategory(MemberName: string, MemberDescription: string) {
    const data: MembersData = {
      _id: null,
      MemberName: MemberName,
      MemberDescription: MemberDescription,
      IsActive: true,
      EnteredBy: null,
      WhenEntered: new Date(),
      ModifiedBy: null,
      WhenModified: null,
    };
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
      .get<{ message: string; Data: any }>(BACKEND_URL + '/getActive')
      .subscribe((transformedPostData) => {
        this.categoryData = transformedPostData.Data;
        this.categoryDataUpdated.next({
          Data: [...this.categoryData],
        });
      });
  }

  getSingleCourseListdb(id: string) {
    return this.http.get<{ message: string; Data: MembersData }>(
      BACKEND_URL + '/' + id
    );
  }

  updateCourseDb(id: string, MemberName: string, MemberDescription: string) {
    const data: MembersData = {
      _id: id,
      MemberName: MemberName,
      MemberDescription: MemberDescription,
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
    const data: MembersData = {
      _id: id,
      MemberName: null,
      MemberDescription: null,
      IsActive: status,
      EnteredBy: null,
      WhenEntered: null,
      ModifiedBy: null,
      WhenModified: new Date(),
    };
    return this.http.post(BACKEND_URL + '/updateStatus' + '/' + id, data);
  }
}
