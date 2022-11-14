import { ApiOperation, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Board } from 'src/apis/boards/entities/board.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  comment: string;

  @ApiProperty({ example: null })
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({ example: '2022-10-11T18:47:32.165Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2022-10-11T18:47:32.165Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiPropertyOptional({ type: Object })
  @ManyToOne(() => User)
  user: User;

  @ApiPropertyOptional({ type: Object })
  @ManyToOne(() => Board, { eager: true })
  board: Board;
}
