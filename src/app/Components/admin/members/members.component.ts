import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/Services/members/members.service';
import { MembersData } from 'src/app/Services/members/members.data.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit, OnDestroy {
  constructor(
    public categoryService: MemberService,
    public toastr: ToastrService
  ) {}

  private mode = 'create';
  Category: MembersData;
  CategoryList: MembersData[];
  private Id: string;
  private categorysSub: Subscription;
  form: FormGroup;
  ngOnInit() {
    this.resetForm();

    this.getCategoryList();

    this.form = new FormGroup({
      MemberName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      MemberDescription: new FormControl(null, {
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
          this.form.value.MemberName,
          this.form.value.MemberDescription
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
          this.form.value.MemberName,
          this.form.value.MemberDescription
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
          MemberName: result.Data.MemberName,
          MemberDescription: result.Data.MemberDescription,
          IsActive: true,
          EnteredBy: null,
          WhenEntered: null,
          ModifiedBy: null,
          WhenModified: null,
        };
        this.form.setValue({
          MemberName: this.Category.MemberName,
          MemberDescription: this.Category.MemberDescription,
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
