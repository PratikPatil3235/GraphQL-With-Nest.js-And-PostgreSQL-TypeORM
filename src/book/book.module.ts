import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entity/book.entity';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  exports: [],
  controllers: [],
  providers: [BookService, BookResolver],
})
export class BookModule {}
