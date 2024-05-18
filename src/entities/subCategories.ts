import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Posts } from './posts';
import { Categories } from './categories';

export class subCategories {
  @PrimaryColumn()
  subCategoriesId!: number;

  @Column()
  subCategorisName!: string;

  @ManyToOne(() => Categories, (Categories) => Categories.subCategories)
  Categories!: Categories;

  @OneToMany(() => Posts, (Posts) => Posts.subCategories)
  Posts!: Posts;
}
