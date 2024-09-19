import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd'; // Correct import path
import { RolesGuard } from '../auth/gaurd'; // Correct import path
import { Role } from '../auth/roleDecorator';
import { Roles as UserRoles } from '../auth/role.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Role(UserRoles.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async createUser(@Body() createUserDto: any) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @Role(UserRoles.ADMIN, UserRoles.USER)
  // @UseGuards(RolesGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Role(UserRoles.ADMIN, UserRoles.USER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @Role(UserRoles.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(@Param('id') id: number, @Body() updateUserDto: any, @Req() req: any) {
    const user = req.user;
    if (user.userId !== id && !user.roles.includes(UserRoles.ADMIN)) {
      throw new ForbiddenException('You cannot update this user');
    }
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Role(UserRoles.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param('id') id: number, @Req() req: any) {
    const user = req.user;
    if (user.userId === id) {
      throw new ForbiddenException('You cannot delete your own account');
    }
    return this.usersService.deleteUser(id);
  }
}
