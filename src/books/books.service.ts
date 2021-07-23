import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateBooksDto } from './dto/create-book.dto';
import { Books } from './entities/books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private readonly usersRepository: Repository<Books>,
  ) { }

  create(createBookDto: CreateBooksDto): Promise<Books> {
    const book = new Books();
    book.bookid = createBookDto.bookid;
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.publisher = createBookDto.publisher;
    book.publishedAt = createBookDto.publishedAt;
    book.isbn = createBookDto.isbn;
    book.image = createBookDto.image;
    book.category = createBookDto.category;
    return this.usersRepository.save(book);
  }

  async findAll(): Promise<Books[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Books> {
    return this.usersRepository.findOne(id);
  }

  searchOne(title: string): Promise<Books | undefined> {
    const bookinfo = getRepository(Books)
      .createQueryBuilder("title")
      .where("title = :title", { title: title })
      .getOne();
    return bookinfo;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}