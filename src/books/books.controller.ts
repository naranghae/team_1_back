import { Body, Controller, Delete, Get, MethodNotAllowedException, Param, Post, Query, Req } from '@nestjs/common';
import { CreateBooksDto } from './dto/create-book.dto';
import { Books } from './entities/books.entity';
import { BooksService } from './books.service';
import { Request } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  // @Get('search')
  // search(@Query('title') searchingTitle: string): Promise<Books> {
  //   return this.booksService.searchOne(searchingTitle);
  // }

  @Get('search')
  async search(@Req() req: Request) {
    const builder = await this.booksService.queryBuilder('books');
    console.log(req.query.searching);
    if (req.query.searching) {
      builder.where("books.title LIKE :searching OR books.category LIKE :searching", { searching: `%${req.query.searching}%` });
    }

    const sort: any = req.query.sort;
    console.log(sort);
    if (sort) {
      builder.orderBy('books.title', "ASC");
    }

    const page: number = parseInt(req.query.page as any) || 1;
    const perPage = 10;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return {
      data: await builder.getMany(),
      total,
      page,
      last_page: Math.ceil(total / perPage)
    };
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