import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
const moduleMocker = new ModuleMocker(global);

describe('UserController', () => {
    let controller: UserController;

    const mockJwtService = {
        sign: jest.fn(),
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
      const mockUserRepository = {
        findOne: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
      };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            
        })
        .useMocker((token) => {
            const result = ['test1', 'test2']
            if(token === UserService){
                return {
                    createUser: jest.fn(() => result),
                    login: jest.fn(() => result),
                }
            }
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                return new Mock();
              }
        })
        .compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
