import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { InvestmentModule } from './investment/investment.module';
import { AuthModule } from './auth/auth.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    InvestmentModule,
    AuthModule,
    RateLimiterModule.forRoot({
      points: 10, // Number of points
      duration: 60, // Per second(s)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
