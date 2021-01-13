import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Subject } from 'rxjs';
import { EventData } from './events.data.model';

const BACKEND_URL = environment.apiUrl + '/events';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(public http: HttpClient, public router: Router) {}

  private categoryData: EventData[] = [];
  private categoryDataUpdated = new Subject<{ Data: EventData[] }>();

  createCategory(EventName: string, EventDescription: string) {
    const eventData: EventData = {
      _id: null,
      EventName: EventName,
      EventDescription: EventDescription,
      IsActive: true,
      EnteredBy: null,
      WhenEntered: new Date(),
      ModifiedBy: null,
      WhenModified: null,
    };
    return this.http.post(BACKEND_URL + '/addEvent', eventData);
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

  getActiveEventsListdb() {
    return this.http.get<{ message: string; Data: any }>(
      BACKEND_URL + '/getActiveEvents'
    );
  }

  getSingleCourseListdb(id: string) {
    return this.http.get<{ message: string; Data: EventData }>(
      BACKEND_URL + '/' + id
    );
  }

  updateCourseDb(Eventid: string, EventName: string, EventDescription: string) {
    const eventData: EventData = {
      _id: Eventid,
      EventName: EventName,
      EventDescription: EventDescription,
      IsActive: true,
      EnteredBy: null,
      WhenEntered: null,
      ModifiedBy: null,
      WhenModified: new Date(),
    };
    return this.http.put(BACKEND_URL + '/' + Eventid, eventData);
  }

  deleteCategory(Eventid: string) {
    return this.http.delete(BACKEND_URL + '/' + Eventid);
  }

  UpdateCategoryStatus(Eventid: string, status: boolean) {
    const eventData: EventData = {
      _id: Eventid,
      EventName: null,
      EventDescription: null,
      IsActive: status,
      EnteredBy: null,
      WhenEntered: null,
      ModifiedBy: null,
      WhenModified: new Date(),
    };
    return this.http.post(
      BACKEND_URL + '/updateStatus' + '/' + Eventid,
      eventData
    );
  }
}
