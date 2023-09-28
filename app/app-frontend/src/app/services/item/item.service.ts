import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  readonly url = `${environment.todoApiUrl}/item`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.url}/all`);
  }
  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.url}/${id}`);
  }
  create(item: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(`${this.url}`, item);
  }
  update(item: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(`${this.url}/${item.id}`, item);
  }
  getAllByFilters(item: Partial<Item>): Observable<Item[]> {
    return this.http.post<Item[]>(`${this.url}/getAllByFilters`, item);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
