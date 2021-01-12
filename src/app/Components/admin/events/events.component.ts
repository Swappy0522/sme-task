import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/Services/events/event.service';
import { EventData } from 'src/app/Services/events/events.data.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit, OnDestroy {
  constructor(
    public categoryService: EventService,
    public toastr: ToastrService
  ) {}

  private mode = 'create';
  Category: EventData;
  CategoryList: EventData[];
  private Id: string;
  private categorysSub: Subscription;
  form: FormGroup;
  ngOnInit() {
    this.resetForm();

    this.getCategoryList();

    this.form = new FormGroup({
      EventName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      EventDescription: new FormControl(null, {
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
          this.form.value.EventName,
          this.form.value.EventDescription
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
          this.form.value.EventName,
          this.form.value.EventDescription
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
          EventName: result.Data.EventName,
          EventDescription: result.Data.EventDescription,
          IsActive: true,
          EnteredBy: null,
          WhenEntered: null,
          ModifiedBy: null,
          WhenModified: null,
        };
        this.form.setValue({
          CategoryName: this.Category.EventName,
          CategoryDescription: this.Category.EventDescription,
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
