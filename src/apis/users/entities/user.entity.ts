import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/apis/boards/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 'jhyeom1545@gmail.com', default: 'jhyeom1545@gmail.com' })
  @PrimaryColumn({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @ApiProperty({ example: '홍길동' })
  @Column()
  name: string;

  @ApiProperty({ example: 500 })
  @Column()
  points?: number;

  @ApiProperty({ example: null })
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({ example: '2022-10-11T18:47:32.165Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2022-10-11T18:47:32.165Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
