import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Books } from './entities/books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule { }
