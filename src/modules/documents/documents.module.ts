import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DocumentsService } from "./documents.service"
import { DocumentsController } from "./documents.controller"
import { CategoryDocument } from "src/database/entities/documents/category-document.entity"
import { Document } from "src/database/entities/documents/document.entity"
import { AgencyDocument } from "src/database/entities/documents/agency-document.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Document, CategoryDocument,AgencyDocument])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
