import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './schema/book.schema';
import { BookService } from './book.service';
import { AddBookArgs } from './args/addbook.args';
import { UpdateBookArgs } from './args/updateBook.args';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query((returns) => [Book], { name: 'books' })
  async getAllBooks() {
    return await this.bookService.findAllBooks();
  }

  @Query((returns) => Book, { name: 'bookById' })
  async getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return await this.bookService.findBookById(id);
  }

  @Mutation((returns) => String, { name: 'deleteBook' })
  async deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return await this.bookService.deleteBookById(id);
  }

  @Mutation((returns) => String, { name: 'addBook' })
  async addBook(@Args('addBookArgs') addBookArgs: AddBookArgs) {
    return await this.bookService.addBook(addBookArgs);
  }

  @Mutation((returns) => String, { name: 'updateBook' })
  async updateBook(@Args('updateBookArgs') updateBookArgs: UpdateBookArgs) {
    return await this.bookService.updateBook(updateBookArgs);
  }
}
