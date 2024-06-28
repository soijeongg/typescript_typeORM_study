import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { subCategories } from './subCategories';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  categoriesId!: number;

  @Column()
  categoriesName!: string;

  @OneToMany(() => subCategories, (subCategories) => subCategories.Categories)
  subCategories!: subCategories[];
}
