import { Book } from './book';

export class BookWithQuantity {
    constructor(public book: Book,
                public quantity: number) {}
}
