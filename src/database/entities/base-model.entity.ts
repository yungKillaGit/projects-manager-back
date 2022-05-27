import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'now()' })
  updated: Date;
}

export class SimpleBaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
