import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  itemForm: FormGroup = new FormGroup([]);
  constructor(
    protected formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TodoItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private service: ItemService
  ) {}
  ngOnInit(): void {
    if (this.data.id) {
      this.service.getById(this.data.id).subscribe((item) => {
        if (item) {
          this.initializeForm(item);
        }
      });
    }
    this.initializeForm();
  }
  initializeForm(item?: Item) {
    if (item) {
      this.itemForm = this.formBuilder.group({
        id: [item.id],
        description: [item.description, Validators.required],
        dueDate: [item.dueDate, [Validators.required]],
        priority: [item.priority, Validators.required],
      });
    } else {
      this.itemForm = this.formBuilder.group({
        id: [],
        description: [null, Validators.required],
        dueDate: [null, [Validators.required]],
        priority: [null, Validators.required],
      });
    }
  }
  onSubmit() {
    const vf = this.itemForm.value;
    if (vf.id) {
      this.service.update(this.itemForm.value).subscribe((res) => {
        this.onClose(res);
      });
    } else {
      this.service.create(this.itemForm.value).subscribe((res) => {
        this.onClose(res);
      });
    }
  }

  onClose(item?: Item) {
    this.dialogRef.close(item);
  }
}
