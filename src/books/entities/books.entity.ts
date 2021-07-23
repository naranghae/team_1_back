import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Books {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bookid: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publisher: string;

    @Column()
    publishedAt: string;

    @Column()
    isbn: string;

    @Column()
    image: string;

    @Column()
    category: string;
}