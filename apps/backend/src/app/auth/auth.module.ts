import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret_key',
      signOptions: { expiresIn: '60m' },
    }),
    RateLimiterModule,
    PrismaModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
