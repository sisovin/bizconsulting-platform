import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUnique: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = { id: '1', email, password: await argon2.hash(password) } as User;

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValue(true);

      expect(await service.validateUser(email, password)).toEqual(user);
    });

    it('should return null if credentials are invalid', async () => {
      const email = 'test@example.com';
      const password = 'password';

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      expect(await service.validateUser(email, password)).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access and refresh tokens for valid user', async () => {
      const user = { id: '1', email: 'test@example.com' } as User;
      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';

      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(accessToken).mockReturnValueOnce(refreshToken);

      expect(await service.login(user)).toEqual({ accessToken, refreshToken });
    });
  });

  describe('register', () => {
    it('should create a new user and return it', async () => {
      const registerDto: RegisterDto = { email: 'test@example.com', password: 'password' };
      const user = { id: '1', email: registerDto.email } as User;

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);
      jest.spyOn(argon2, 'hash').mockResolvedValue('hashedPassword');

      expect(await service.register(registerDto)).toEqual(user);
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens if refresh token is valid', async () => {
      const token = 'refreshToken';
      const user = { id: '1', email: 'test@example.com' } as User;
      const accessToken = 'newAccessToken';
      const refreshToken = 'newRefreshToken';

      jest.spyOn(jwtService, 'verify').mockReturnValue({ email: user.email });
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(service, 'login').mockResolvedValue({ accessToken, refreshToken });

      expect(await service.refreshToken(token)).toEqual({ accessToken, refreshToken });
    });

    it('should return null if refresh token is invalid', async () => {
      const token = 'invalidToken';

      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(await service.refreshToken(token)).toBeNull();
    });
  });
});
