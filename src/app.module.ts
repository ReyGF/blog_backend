import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthController } from './login/auth/auth.controller';
import { UsersController } from './login/users/users.controller';
import { DashboardController } from './dashboard/dashboard.controller';

@Module({
  imports: [PostsModule, CommentsModule],
  controllers: [AppController, AuthController, UsersController, DashboardController],
  providers: [AppService],
})
export class AppModule {}
