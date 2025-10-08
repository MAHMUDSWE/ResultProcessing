import { BaseEntity } from '@/common/entities/base.entity';
import { Department } from '@/department/entities/department.entity';
import { ResultLab } from '@/result/entities/result-lab.entity';
import { ResultTheory } from '@/result/entities/result-theory.entity';
import { Takes } from '@/takes/entities/takes.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';

@Entity('tbl_student')
@Unique(['std_email'])
@Unique(['std_phone'])
export class Student extends BaseEntity {
    @PrimaryColumn()
    reg_no: number;

    @Column({ length: 40 })
    std_name: string;

    @ManyToOne(() => Department, (dept) => dept.students, { onDelete: 'SET NULL' })
    department: Department;

    @Column({ length: 40, nullable: true })
    std_email: string;

    @Column({ length: 15, nullable: true })
    std_phone: string;

    @Column({ length: 200, nullable: true })
    std_address: string;

    @Column({ type: 'date', nullable: true })
    std_dateOfBirth: Date;

    @OneToMany(() => Takes, (take) => take.student)
    takes: Takes[];

    @OneToMany(() => ResultLab, (result) => result.student)
    labResults: ResultLab[];

    @OneToMany(() => ResultTheory, (result) => result.student)
    theoryResults: ResultTheory[];
}
