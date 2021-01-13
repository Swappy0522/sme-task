import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/Services/posts/posts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  private TipSub: Subscription;
  public searchText: string;
  public PostList: any = [];
  constructor(
    public postService: PostsService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.TipSub = this.route.params.subscribe((params) => {
      const search = params['search'];
      this.searchText = search;
      this.LoadPost();
    });
  }
  LoadPost() {
    this.postService.getPostByText(this.searchText).subscribe((result) => {
      console.log(result);
      this.PostList = result.Data;
      console.log(this.PostList);
    });
  }
}
