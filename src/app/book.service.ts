import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookWithQuantity } from './model/book-with-quantity';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.httpClient.get(environment.bookService + '/list');
  }

  addNewBook(bookWithQuantity: BookWithQuantity): Observable<any> {
    return this.httpClient.post(environment.bookService + '/add', bookWithQuantity,
    {responseType: 'text'});
  }

  buyBook(bookWithAddress): Observable<any> {
    return this.httpClient.post(environment.bookService + '/buy', bookWithAddress,
    {responseType: 'text'});
  }
}
