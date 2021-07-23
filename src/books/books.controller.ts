import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateBooksDto } from './dto/create-book.dto';
import { Books } from './entities/books.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get('search')
  search(@Query('title') searchingTitle: string): Promise<Books> {
    return this.booksService.searchOne(searchingTitle);
  }

  @Post()
  create(@Body() CreateBookDto: CreateBooksDto): Promise<Books> {
    return this.booksService.create(CreateBookDto);
  }

  @Get()
  findAll(): Promise<Books[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Books> {
    return this.booksService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}