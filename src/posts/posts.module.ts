import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [DbModule]
})
export class PostsModule {}
