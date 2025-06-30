import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { Group } from "../groups/group.entity"
import { HistoriesLeader } from "../histories/histories-leader.entity"

export enum UserType {
  THIEU_UY = "thieu_uy",
  TRUNG_UY = "trung_uy",
  DAI_UY = "dai_uy",
  THIEU_TA = "thieu_ta",
  TRUNG_TA = "trung_ta",
  DAI_TA = "dai_ta",
  THIEU_TUONG = "thieu_tuong",
  TRUNG_TUONG = "trung_tuong",
  DAI_TUONG = "dai_tuong",
}

export enum RoleType {
  BTV = "btv",
  ADMIN = "admin",
  USER = "user"
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  name: string

  @Column({nullable:true, length: 255 })
  position: string

  @Column({nullable:true, length: 255 })
  username: string

  @Column({nullable:true, length: 255 })
  password: string

  @Column({ nullable: true })
  avatar: string

  @Column({nullable:true, length: 100 })
  experience: string

  @Column({ type: "nvarchar", length: "max" })
  education: string

  @Column({ type: "simple-array" })
  achievements: string[]

  @Column({nullable:true, length: 20 })
  phone: string

  @Column({nullable:true, length: 255 })
  email: string

  @Column({
    type: "nvarchar",
    enum: UserType,
    default: UserType.THIEU_UY,
  })
  type: UserType

  @Column({
    type: "nvarchar",
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType


  @ManyToOne(
    () => Group,
    (group) => group.users,
  )
  @JoinColumn({ name: "group" })
  group: Group

  @OneToMany(
    () => HistoriesLeader,
    (history) => history.user,
  )
  historiesLeader: HistoriesLeader[]

  @Column({ type:"bit",default:0 })
  activity: boolean

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
