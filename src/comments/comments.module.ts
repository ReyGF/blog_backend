import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports:[DbModule]
})
export class CommentsModule {}
