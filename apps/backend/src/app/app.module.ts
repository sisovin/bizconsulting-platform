import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { InvestmentModule } from './investment/investment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    InvestmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
