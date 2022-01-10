import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from './base-model'
import { Book } from '.'

/** Class representing a publisher. */
@Entity()
export class Publisher extends BaseModel {
  @Column({
    length: 100,
    unique: true,
  })
  name: string

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[]
}
