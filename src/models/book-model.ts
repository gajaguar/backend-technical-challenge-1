import { Column, Entity, Generated, ManyToOne } from 'typeorm'
import { BaseModel } from './base-model'
import { Author, Publisher, Genre } from '../models'

/** Class representing a book. */
@Entity()
export class Book extends BaseModel {
  @Column({
    length: 100,
    unique: true,
  })
  name: string

  @ManyToOne(() => Author, (author) => author.books)
  author: Author

  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: true,
  })
  publisher: Publisher

  @ManyToOne(() => Genre, (genre) => genre.books, {
    nullable: true,
  })
  genre: number

  @Column()
  year: number

  @Column({
    unique: true,
  })
  @Generated('uuid')
  isbn: string

  @Column()
  quantity: number
}
