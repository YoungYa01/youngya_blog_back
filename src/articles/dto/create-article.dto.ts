export class CreateArticleDto {
  id: number;
  titleZH: string;
  titleEN: string;
  content: string;
  createdAt: Date;
  tagList: number[];
  cover: string;
}
