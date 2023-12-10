import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  public title: string;

  @IsNumber()
  public authorId: number;

  @IsString()
  public content: string;
}
