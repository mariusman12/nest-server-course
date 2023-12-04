import { Controller, Post, Body, UseGuards, Get, Patch,Param} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApprovedReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('/getMesaj')
  getMesaj(){
    console.log('Am ajuns aici')
    return 'Am ajuns aici'
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user:User) {
    return this.reportsService.create(body, user);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveReport(@Param('id') id:string, @Body() body:ApprovedReportDto){
    return this.reportsService.changeApproval(id, body.approved)

  }

}
