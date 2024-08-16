
/*
model Users {
  id        String     @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email     String     @unique @db.VarChar(255)
  name      String     @db.VarChar(60)
  password  String     @db.VarChar(255)
  avatar    String?    @db.VarChar(255)
  createdAt DateTime   @default(now()) @db.Timestamptz
  updatedAt DateTime   @default(now()) @db.Timestamptz
  isDeleted Boolean    @default(false)
  rolId     Int        @default(3)
  rol       Roles      @relation(fields: [rolId], references: [id])
  posts     Posts[]
  comments  Comments[]
}
*/

import { IsEmail, IsLowercase, IsString, MinLength } from "class-validator";

export class LoginAuthDto {

  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

}
