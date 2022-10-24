import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Board {
  @ApiProperty({ example: '6020c315-c982-496e-bb50-f7340c485f1f' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ example: '게시글 제목' })
  title: string;

  @Column()
  @ApiProperty({ example: '게시글 내용' })
  content: string;

  @Column()
  @ApiProperty({ example: 'jhyeom1545@gmail.com' })
  email: string;

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