import { BaseEntity } from '@/common/entities/base.entity';
import { Department } from '@/department/entities/department.entity';
import { ResultLab } from '@/result/entities/result-lab.entity';
import { ResultTheory } from '@/result/entities/result-theory.entity';
import { Teach } from '@/teach/entities/teach.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('tbl_teacher')
@Unique(['teacher_email'])
@Unique(['teacher_phone'])
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn()
    teacher_id: number;

    @Column({ length: 40 })
    teacher_name: string;

    @ManyToOne(() => Department, (dept) => dept.teachers, { onDelete: 'SET NULL' })
    department: Department;

    @Column({ length: 40, nullable: true })
    teacher_email: string;

    @Column({ length: 15, nullable: true })
    teacher_phone: string;

    @OneToMany(() => Teach, (teach) => teach.teacher)
    teaches: Teach[];

    @OneToMany(() => ResultLab, (result) => result.firstTeacher)
    labResults: ResultLab[];

    @OneToMany(() => ResultTheory, (result) => result.firstTeacher)
    firstTheoryResults: ResultTheory[];

    @OneToMany(() => ResultTheory, (result) => result.secondTeacher)
    secondTheoryResults: ResultTheory[];
}
