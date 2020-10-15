import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import {first} from 'rxjs/operators';
import {BookWithQuantity} from '../model/book-with-quantity';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../model/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  bookNameFilter = '';
  authorFilter = '';
  shippingAddress = '';
  booksWithQuantity: BookWithQuantity[] = [];
  filteredBooksWithQuantity: BookWithQuantity[] = [];
  successMessage = '';

  constructor(private bookService: BookService, private route: ActivatedRoute) {
    if (this.route.snapshot.queryParams.addedBook) {
      this.successMessage = 'Book added succesfully';
    }
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks().pipe(first()).subscribe(booksWithQuantity => {
      this.booksWithQuantity = booksWithQuantity;
      this.filteredBooksWithQuantity = booksWithQuantity;
    });
    this.filterBooks();
  }

  filterByBookName(bookNameFilter: string): void {
    this.bookNameFilter = bookNameFilter;
    this.filterBooks();
  }

  filterByAuthor(authorFilter: string): void {
    this.authorFilter = authorFilter;
    this.filterBooks();
  }

  filterBooks(): void {
    this.filteredBooksWithQuantity = this.booksWithQuantity.filter(bookWithQuantity =>
      bookWithQuantity.book.author.toLowerCase().includes(this.authorFilter.toLowerCase())
       && bookWithQuantity.book.name.toLowerCase().includes(this.bookNameFilter.toLowerCase())
    );
  }

  updateShippingAddress(shippingAddress: string): void {
    this.shippingAddress = shippingAddress;
  }

  buyBook(book: Book): void {
    const bookWithAddress = {
      book,
      shippingAddress: this.shippingAddress
    };
    this.bookService.buyBook(bookWithAddress).pipe(first()).subscribe(ok => {
      this.successMessage = 'Book ' + book.name + ' by ' + book.author + ' is shipped to ' + bookWithAddress.shippingAddress;
      this.getBooks();
    });
  }
}
