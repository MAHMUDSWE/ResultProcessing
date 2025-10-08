import { BaseEntity } from '@/common/entities/base.entity';
import { CoursePrerequisite } from '@/course-prerequisite/entities/course-prerequisite.entity';
import { Department } from '@/department/entities/department.entity';
import { ResultLab } from '@/result/entities/result-lab.entity';
import { ResultTheory } from '@/result/entities/result-theory.entity';
import { Takes } from '@/takes/entities/takes.entity';
import { Teach } from '@/teach/entities/teach.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('tbl_course')
export class Course extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    course_id: string;

    @Column({ length: 70, nullable: true })
    course_title: string;

    @ManyToOne(() => Department, (dept) => dept.courses, { onDelete: 'SET NULL' })
    department: Department;

    @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
    course_credits: number;

    @Column({ length: 15, nullable: true })
    course_type: string;

    @Column({ length: 15, nullable: true })
    course_isMajor: string;

    @OneToMany(() => CoursePrerequisite, (cp) => cp.course)
    prerequisites: CoursePrerequisite[];

    @OneToMany(() => Takes, (take) => take.course)
    takes: Takes[];

    @OneToMany(() => Teach, (teach) => teach.course)
    teaches: Teach[];

    @OneToMany(() => ResultLab, (result) => result.course)
    labResults: ResultLab[];

    @OneToMany(() => ResultTheory, (result) => result.course)
    theoryResults: ResultTheory[];
}
