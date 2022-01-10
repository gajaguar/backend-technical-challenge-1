import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from './base-model'
import { Book } from '.'

/** Class representing a genre. */
@Entity()
export class Genre extends BaseModel {
  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string

  @OneToMany(() => Book, (book) => book.genre)
  books: Book[]
}
