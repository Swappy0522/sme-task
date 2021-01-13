import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventService } from 'src/app/Services/events/event.service';
//import { EventData } from 'src/app/Services/events/events.data.model';
import { MemberService } from 'src/app/Services/members/members.service';
//import { MembersData } from 'src/app/Services/members/members.data.model';
import { PostsService } from 'src/app/Services/posts/posts.service';
//import { PostsData } from 'src/app/Services/posts/posts.data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private postsSub: Subscription;
  private eventsSub: Subscription;
  private membersSub: Subscription;

  public postList = [];
  public eventList = [];
  public memberList = [];

  event_list = [
    {
      event: ' Event 1',
      eventLocation: 'Bangalore',
      eventDescription:
        'In bangalore, first event is going to happen. Please be careful about it',
      img:
        '/assets/img/slider/Banner-for-online-registration_Tech-Breakfast-2020.jpg',
      eventStartDate: new Date('2019/05/20'),
      eventEndingDate: new Date('2019/05/24'),
    },
    {
      event: ' Event 2',
      eventLocation: 'Dubai',
      eventDescription:
        'Dubai is another place to host so,e, first event is going to happen. Please be careful about it',
      img: '/assets/img/slider/business-models-report.jpg',
      eventStartDate: new Date('2019/07/28'),
      eventEndingDate: new Date('2019/07/30'),
    },
    {
      event: ' Event 3',
      eventLocation: 'New York',
      eventDescription: 'NewYork sits on top of event hosting',
      img: '/assets/img/slider/eucodis-enzymes-technology-slider.jpg',
      eventStartDate: new Date('2020/05/20'),
      eventEndingDate: new Date('2020/05/24'),
    },
    {
      event: ' Event 4',
      eventLocation: 'Singapore',
      eventDescription: 'Singapore is another great hosting city',
      img: '/assets/img/slider/FinTech-EventHeroImage2-1600x350.jpg',
      eventStartDate: new Date('2018/05/20'),
      eventEndingDate: new Date('2018/05/24'),
    },
    {
      event: ' Event 5',
      eventLocation: 'Berlin',
      eventDescription: 'Berlin is best place to hang on',
      img: '/assets/img/slider/mobile-app-development-page-1600x350.jpg',
      eventStartDate: new Date('2017/07/10'),
      eventEndingDate: new Date('2017/08/14'),
    },
    {
      event: ' Event 6',
      eventLocation: 'Mumbai',
      eventDescription: 'Mumbai is hub of startups',
      img: '/assets/img/slider/',
      eventStartDate: new Date(),
      eventEndingDate: new Date(),
    },
    {
      event: ' Event 7',
      eventLocation: 'Barcelona',
      eventDescription: 'Barcelona is another good city',
      img: '/assets/img/slider/',
      eventStartDate: new Date(),
      eventEndingDate: new Date(),
    },
  ];

  upcoming_events = this.event_list.filter(
    (event) => event.eventStartDate > new Date()
  );
  past_events = this.event_list.filter(
    (event) => event.eventEndingDate < new Date()
  );
  current_events = this.event_list.filter(
    (event) =>
      event.eventStartDate >= new Date() && event.eventEndingDate <= new Date()
  );
  constructor(
    public postService: PostsService,
    public eventService: EventService,
    public memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadEvents();
    this.loadMember();
  }

  loadPosts() {
    this.postService.getActiveCategoryListdb();
    this.postsSub = this.postService
      .getCategoryUpdateListener()
      .subscribe((result) => {
        console.log(result);
        this.postList = result.Data;
      });
  }

  loadEvents() {
    this.eventService.getActiveEventsListdb().subscribe((result) => {
      console.log(result);
      this.eventList = result.Data;
    });
  }

  loadMember() {
    this.memberService.getActiveMemberListdb().subscribe((result) => {
      console.log(result);
      this.memberList = result.Data;
    });
  }
}
