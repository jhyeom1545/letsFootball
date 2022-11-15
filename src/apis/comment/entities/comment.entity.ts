import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ example: '6020c315-c982-496e-bb50-f7340c485f1f' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ example: '댓글 작성예시 입니다.' })
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

  @ApiPropertyOptional({
    type: Object,
    example: { email: 'jhyeom1545@gmail.com' },
    description: '게시글을 작성한 유저 이메일',
  })
  @ManyToOne(() => User)
  user: User;

  @ApiPropertyOptional({ type: Object })
  @ManyToOne(() => Board, { eager: true })
  board: Board;
}
