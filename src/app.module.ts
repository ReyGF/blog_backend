import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [PostsModule, CommentsModule, SuggestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
