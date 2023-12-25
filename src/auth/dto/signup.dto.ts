import { IsNotEmpty, IsEmail, IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserRole } from '../../user/entities/user.entity';

class PhoneDto {
  @IsNotEmpty({ message: 'Country code is required' })
  @ApiProperty({ description: 'Country code', example: '1' })
  countryCode: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @ApiProperty({ description: 'Phone number', example: '123456789' })
  phoneNumber: string;
}

export class SignUpDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString({ message: 'Full name must be a string' })
  @ApiProperty({ description: 'Full name', example: 'John Doe' })
  fullname: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({ description: 'Email', example: 'john.doe@example.com' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @ApiProperty({ description: 'Password', example: 'your_password' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString({ message: 'Confirm password must be a string' })
  @ApiProperty({ description: 'Confirm password', example: 'your_password' })
  confirmPassword: string;

  @Type(() => PhoneDto)
  @ValidateNested({ each: true })
  @IsNotEmpty({ message: 'Phone details are required' })
  @ApiProperty({ type: [PhoneDto] })
  phone: PhoneDto[];

  @IsOptional()
  @ApiPropertyOptional({ enum: UserRole, description: 'User role', enumName: 'UserRole', example: UserRole.Admin })
  role?: UserRole;
}
