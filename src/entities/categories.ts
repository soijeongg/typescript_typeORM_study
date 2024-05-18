import {
  Entity,
  PrimaryColumnOptions,
  Column,
  ManyToOne,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { subCategories } from './subCategories';

@Entity()
export class Categories {
  @PrimaryColumn()
  categoriesId!: number;

  @Column()
  categoruesName!: string;

  @OneToMany(() => subCategories, (subCategories) => subCategories.Categories)
  subCategories!: subCategories;
}