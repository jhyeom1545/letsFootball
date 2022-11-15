import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserService } from 'src/apis/user/user.service';
import { BoardService } from 'src/apis/boards/board.service';
import { User } from 'src/apis/user/entities/user.entity';
import { Board } from 'src/apis/boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Board])],
  controllers: [CommentController],
  providers: [CommentService, UserService, BoardService],
})
export class CommentModule {}
