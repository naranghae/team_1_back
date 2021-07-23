import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { AppService } from './app.service';
import { Books } from './books/entities/books.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'movies',
      password: '1q2w3e4r',
      database: 'movies',
      entities: [Books],
      autoLoadEntities: true,
      synchronize: true
    }), BooksModule
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule { constructor(private connection: Connection) { } }