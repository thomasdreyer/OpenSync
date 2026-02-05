import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PullDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  since: number;
}
