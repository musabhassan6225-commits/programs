import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

class CreateUserDto {
  email: string;
  fullName: string;
  passwordHash: string;
  roles: string[];
  clinicId?: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
