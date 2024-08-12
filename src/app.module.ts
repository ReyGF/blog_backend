import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PostsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
