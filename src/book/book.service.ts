import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entity/book.entity';
import { Repository } from 'typeorm';
import { AddBookArgs } from './args/addbook.args';
import { UpdateBookArgs } from './args/updateBook.args';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAllBooks(): Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  async findBookById(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} Not found`);
    }
    return book;
  }

  async deleteBookById(id: number): Promise<string> {
    const book = await this.bookRepository.delete(id);
    if (book.affected === 0) {
      throw new NotFoundException(`Book with id ${id} Not found`);
    }
    return `Book Has been deleted`;
  }

  async addBook(addBookArgs: AddBookArgs): Promise<string> {
    let book: BookEntity = new BookEntity();
    book.title = addBookArgs.title;
    book.price = addBookArgs.price;
    await this.bookRepository.save(book);
    return `book has been succesfully added`;
  }

  async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
    const book = await this.bookRepository.findOne({
      where: { id: updateBookArgs.id },
    });

    if (!book) {
      throw new NotFoundException(
        `Book with id ${updateBookArgs.id} not found`,
      );
    }

    book.title = updateBookArgs.title ?? book.title;
    book.price = updateBookArgs.price ?? book.price;

    await this.bookRepository.save(book);
    return `Book has been succesfully updated...`;
  }
}
