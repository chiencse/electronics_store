import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';

describe('UserService', () => {
    let service: UserService;

    const mockUserRepository = {
        findOne: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
      };
      const mockDataSource = {
        createQueryRunner: jest.fn().mockReturnValue({
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: {
            save: jest.fn(),
            create: jest.fn(),
          },
        }),
      };
      const mockJwtService = {
        sign: jest.fn(),
      };

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            UserService,
            {
              provide: getRepositoryToken(User),
              useValue: mockUserRepository,
            },
            { provide: JwtService, useValue: mockJwtService },
            { provide: DataSource, useValue: mockDataSource },
          ],
        }).compile();


        service = module.get<UserService>(UserService);

    });
        it('should be defined', () => {
            expect(service).toBeDefined();
        });

});

