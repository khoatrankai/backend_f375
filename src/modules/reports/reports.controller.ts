import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import { ReportsService } from "./reports.service";
import { CreateCategoryReportDto } from "src/dto/create-category-report.dto";
import { CreateReportDto } from "src/dto/create-report.dto";
import { UpdateReportDto } from "src/dto/update-report.dto";
@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    console.log(createReportDto) 
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll(@Query("category") category?: string) {
    if (category) {
      return this.reportsService.findByCategory(category)
    }
    return this.reportsService.findAll()
  }

  @Get("categories")
  findAllCategories() {
    return this.reportsService.findAllCategories()
  }

  @Post("categories")
  createCategory(@Body() createCategoryDto: CreateCategoryReportDto) {
    return this.reportsService.createCategory(createCategoryDto)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reportsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reportsService.remove(id)
  }
}
