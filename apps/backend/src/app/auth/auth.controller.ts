import { Controller, Post, Body, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { formatApiResponse, handleApiError } from '@libs/utils/src/api.utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @UseGuards(RateLimiterGuard)
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        return formatApiResponse({ message: 'Invalid credentials' }, 'Error', 401);
      }
      const tokens = await this.authService.login(user);
      return formatApiResponse(tokens);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'Registration successful' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @UseGuards(RateLimiterGuard)
  async register(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.authService.register(registerDto);
      return formatApiResponse(user, 'Registration successful', 201);
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Token refresh' })
  @ApiResponse({ status: 200, description: 'Token refresh successful' })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  @UseGuards(RateLimiterGuard)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const tokens = await this.authService.refreshToken(refreshTokenDto.token);
      if (!tokens) {
        return formatApiResponse({ message: 'Invalid token' }, 'Error', 401);
      }
      return formatApiResponse(tokens);
    } catch (error) {
      return handleApiError(error);
    }
  }
}
