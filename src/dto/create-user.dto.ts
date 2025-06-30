import { Transform } from "class-transformer"
import { IsString, IsEmail, IsEnum, IsOptional, IsArray, IsBoolean } from "class-validator"
import { RoleType, UserType } from "src/database/entities/users/user.entity"

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  username?: string

  @IsString()
  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  position?: string

  @IsOptional()
  @IsString()
  avatar?: string

  @IsString()
  @IsOptional()
  experience?: string

  @IsString()
  @IsOptional()
  education?: string

  @Transform(({ value }) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  achievements?: string[]

  @IsString()
  @IsOptional()
  phone?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsEnum(UserType)
  @IsOptional()
  type: UserType

  @IsEnum(RoleType)
  @IsOptional()
  role: RoleType

  @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    activity: boolean

  @IsOptional()
  @IsString()
  group?: string
}
