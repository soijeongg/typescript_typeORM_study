import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Posts } from './posts';
import { Categories } from './categories';

@Entity()
export class subCategories {
  @PrimaryGeneratedColumn()
  subCategoriesId!: number;

  @Column()
  subCategoriesName!: string;

  @ManyToOne(() => Categories, (Categories) => Categories.subCategories)
  Categories!: Categories;

  @OneToMany(() => Posts, (Posts) => Posts.subCategories)
  Posts!: Posts[];
}
