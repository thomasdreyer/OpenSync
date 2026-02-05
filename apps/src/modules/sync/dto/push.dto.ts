import { IsArray, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SyncChangeDto {
  @IsString()
  collection: string;

  @IsObject()
  data: Record<string, unknown>;
}

export class PushDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyncChangeDto)
  changes: SyncChangeDto[];
}
