import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/common/prisma.service';
import { Role } from '@prisma/client';

const mockConfigService = {
  get: jest.fn(),
};

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const mockUser = {
        email: 'test@test.com',
        password: 'test',
        nickname: 'test',
      };

      jest.spyOn(mockPrismaService.user, 'findUnique').mockResolvedValue(null);

      jest.spyOn(mockConfigService, 'get').mockReturnValue('10');

      // jest
      //   .spyOn(bcrypt, 'hash')
      //   .mockResolvedValue('hashedPassword');

      const user = await userService.create(mockUser);

      expect(user).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          id: '302863ba-9523-4ede-9147-5988f7a05d9d',
          email: 'test@test.com',
          role: Role.USER,
          nickname: 'test',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest
        .spyOn(mockPrismaService.user, 'findMany')
        .mockResolvedValue(mockUsers);

      const users = await userService.findAll();
      expect(users).toEqual(mockUsers);
    });
  });
});
