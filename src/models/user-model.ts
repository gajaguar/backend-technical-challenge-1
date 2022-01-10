import bcrypt from 'bcrypt'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { BaseModel } from './base-model'

/** Class representing a User. */
@Entity()
export class User extends BaseModel {
  @Column({
    length: 50,
    nullable: true,
  })
  name: string

  @Column({
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string

  @Column({ length: 64 })
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = this.password
      ? bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
      : ''
  }

  deletePassword = () => {
    const self = JSON.parse(JSON.stringify(this))
    delete self.password

    return self
  }
}
