import { Entity, PrimaryGeneratedColumn, Column, OneToMany ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { Document } from "./document.entity"

@Entity("agency_document")
export class AgencyDocument {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
    @Column({nullable:true, length: 255 })
    name: string
  
    @Column({nullable:true, length: 100 })
    nametag: string
  
    @OneToMany(
      () => Document,
      (document) => document.agency,
    )
    documents: Document[]
  
    @CreateDateColumn({ type: 'datetime2' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'datetime2' })
    updated_at: Date;
}
