import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, async } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item/item.service';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take, switchMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'description',
    'dueDate',
    'priority',
    'dtaCreatedAt',
    'dtaUpdatedAt',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Item>([]);

  itemForm: FormGroup = new FormGroup([]);
  itens$: Observable<Item[]> = new Observable<Item[]>();

  constructor(
    private service: ItemService,
    public dialog: MatDialog,
    protected formBuilder: FormBuilder
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.onSearch();
    this.initializeForm();
  }

  initializeForm() {
    this.itemForm = this.formBuilder.group({
      description: [null, Validators.required],
      priority: [null, Validators.required],
    });
  }

  openModal(id?: number) {
    let dialogRef = this.dialog.open(TodoItemComponent, {
      height: '400px',
      width: '600px',
      data: { id },
    });
    dialogRef.afterClosed().subscribe((item) => {
      this.dataSource = new MatTableDataSource<Item>(
        this.dataSource.data.find((i) => i.id === item.id)
          ? this.dataSource.data.map((i) => (i.id === item.id ? item : i))
          : [...this.dataSource.data, item]
      );
      this.dataSource.paginator = this.paginator;
    });
  }
  onSearch() {
    const vf = this.itemForm.value;
    this.service.getAllByFilters(vf).subscribe((itens) => {
      this.dataSource = new MatTableDataSource<Item>(itens);
      this.dataSource.paginator = this.paginator;
    });
  }
  onDelete(id: number) {
    this.service.delete(id).subscribe(() => {
      this.dataSource = new MatTableDataSource<Item>(
        this.dataSource.data.filter((i) => i.id !== id)
      );
      this.dataSource.paginator = this.paginator;
    });
  }
}
