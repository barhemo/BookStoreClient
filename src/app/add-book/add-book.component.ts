import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private bookService: BookService) { }

  get f() { return this.bookForm.controls; }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      quantity: [1, [Validators.required]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    this.isLoading = true;

    const bookWithQuantity = {
      book: {
        author: this.bookForm.value.author,
        name: this.bookForm.value.name,
      },
      quantity: this.bookForm.value.quantity,
    };

    this.bookService.addNewBook(bookWithQuantity).pipe(first()).subscribe(ok => {
      this.router.navigate(['/'], { queryParams: { addedBook: true } });
    }, error => {
      this.isLoading = false;
      this.errorMessage = 'Error when adding a book';
  });
  }
}
