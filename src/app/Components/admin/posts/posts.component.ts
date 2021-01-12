import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/Services/posts/posts.service';
import { PostsData } from 'src/app/Services/posts/posts.data.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(
    public categoryService: PostsService,
    public toastr: ToastrService
  ) {}

  private mode = 'create';
  Category: PostsData;
  CategoryList: PostsData[];
  private Id: string;
  private categorysSub: Subscription;
  form: FormGroup;
  ngOnInit() {
    this.resetForm();

    this.getCategoryList();

    this.form = new FormGroup({
      PostsName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      PostsDescription: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onChange($event: MatSlideToggleChange, id: string) {
    this.categoryService.UpdateCategoryStatus(id, $event.checked).subscribe(
      (result) => {
        this.resetForm();

        this.getCategoryList();

        this.toastr.success('Status updated successfully.');
      },
      (error) => {}
    );
  }

  getCategoryList() {
    this.categoryService.getCategoryListdb();

    this.categorysSub = this.categoryService
      .getCategoryUpdateListener()
      .subscribe((result) => {
        this.CategoryList = result.Data;
      });
  }

  onSaveEvent() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.categoryService
        .createCategory(
          this.form.value.PostsName,
          this.form.value.PostsDescription
        )
        .subscribe(
          (result) => {
            this.resetForm();

            this.getCategoryList();

            this.toastr.success('New Record Inserted');
          },
          (error) => {}
        );
    } else {
      this.categoryService
        .updateCourseDb(
          this.Id,
          this.form.value.PostsName,
          this.form.value.PostsDescription
        )
        .subscribe((result) => {
          this.resetForm();

          this.getCategoryList();
          this.mode = 'create';
          this.toastr.info('Record updated succesfully');
        });
    }
  }

  onDelete(Categoryid: string) {
    this.categoryService.deleteCategory(Categoryid).subscribe((result) => {
      this.resetForm();
      this.getCategoryList();
      this.toastr.error('Record Deleted succesfully');
    });
  }

  onEdit(Categoryid: string) {
    this.mode = 'edit';
    this.Id = Categoryid;

    this.categoryService.getSingleCourseListdb(Categoryid).subscribe(
      (result) => {
        this.Category = {
          _id: result.Data._id,
          PostsName: result.Data.PostsName,
          PostsDescription: result.Data.PostsDescription,
          IsActive: true,
          EnteredBy: null,
          WhenEntered: null,
          ModifiedBy: null,
          WhenModified: null,
        };
        this.form.setValue({
          PostsName: this.Category.PostsName,
          PostsDescription: this.Category.PostsDescription,
        });
      },
      (error) => {}
    );
  }

  resetForm() {
    if (this.form != null) {
      this.form.reset();
      this.getCategoryList();
    }
  }

  ngOnDestroy() {
    this.categorysSub.unsubscribe();
  }
}
