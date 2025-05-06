import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { InvestmentModule } from './investment/investment.module';
import { AuthModule } from './auth/auth.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        prismaOptions: {
          datasources: {
            db: {
              url: configService.get('DATABASE_URL'),
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    InvestmentModule,
    AuthModule,
    RateLimiterModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        points: configService.get<number>('RATE_LIMITER_POINTS', 10),
        duration: configService.get<number>('RATE_LIMITER_DURATION', 60),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
