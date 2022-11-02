import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './likes.controller';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
