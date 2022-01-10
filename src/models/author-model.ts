import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from './base-model'
import { Book } from '../models'

/** Class representing an author. */
@Entity()
export class Author extends BaseModel {
  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string

  @OneToMany(() => Book, (book) => book.author)
  books: Book[]
}
