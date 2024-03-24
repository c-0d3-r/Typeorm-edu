import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  public text: string;

  @IsNumber()
  public authorId: number;

  @IsNumber()
  public postId: number;
}
