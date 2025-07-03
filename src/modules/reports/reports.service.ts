import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common"
import { In, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

import { CreateReportDto } from "src/dto/create-report.dto"
import { UpdateReportDto } from "src/dto/update-report.dto"
import { CreateCategoryReportDto } from "src/dto/create-category-report.dto"

import { CategoryReport } from "src/database/entities/reports/category-report.entity"
import { Report } from "src/database/entities/reports/report.entity"

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
    @InjectRepository(CategoryReport) private categoryReportRepository: Repository<CategoryReport>,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const category = await this.categoryReportRepository.findOne({ where: { id: createReportDto.category } })
    const report = this.reportsRepository.create({ ...createReportDto, category })
    const result = await this.reportsRepository.save(report)
    return {
      statusCode: HttpStatus.CREATED,
      message: "Report created successfully",
      data: result,
    }
  }

  async findAll() {
    const reports = await this.reportsRepository.find({
      relations: ["category"],
      order: { name: "ASC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: "All reports fetched successfully",
      data: reports,
    }
  }

  async findOne(id: string) {
    const report = await this.reportsRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Report fetched successfully",
      data: report,
    }
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    const existing = await this.reportsRepository.findOne({ where: { id }, relations: ["category"] })
    if (!existing) {
      throw new NotFoundException(`Report with ID ${id} not found`)
    }

    Object.assign(existing, updateReportDto)
    const updated = await this.reportsRepository.save(existing)
    return {
      statusCode: HttpStatus.OK,
      message: "Report updated successfully",
      data: updated,
    }
  }

  async remove(id: string) {
    const report = await this.reportsRepository.findOne({ where: { id } })
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`)
    }

    await this.reportsRepository.remove(report)
    return {
      statusCode: HttpStatus.OK,
      message: "Report deleted successfully",
    }
  }

  async findByCategory(categoryId: string) {
    const reports = await this.reportsRepository.find({
      where: { category: In([categoryId]) },
      relations: ["category"],
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Reports by category fetched successfully",
      data: reports,
    }
  }

  // Category methods
  async createCategory(createCategoryDto: CreateCategoryReportDto) {
    const category = this.categoryReportRepository.create(createCategoryDto)
    const result = await this.categoryReportRepository.save(category)
    return {
      statusCode: HttpStatus.CREATED,
      message: "CategoryReport created successfully",
      data: result,
    }
  }

  async findAllCategories() {
    const categories = await this.categoryReportRepository.find({
      relations: ["reports"],
    })

    return {
      statusCode: HttpStatus.OK,
      message: "All category reports fetched successfully",
      data: categories,
    }
  }
}
