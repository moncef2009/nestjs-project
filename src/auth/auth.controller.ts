import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../utils/decorators/public.decorator';

@Controller('v1/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Bad request', type: String })
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login and get an authentication token' })
  @ApiResponse({ status: 200, description: 'Login successful', type: String })
  @ApiBadRequestResponse({ description: 'Bad request', type: String })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials', type: String })
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return await this.authService.login(loginDto);
  }
}
