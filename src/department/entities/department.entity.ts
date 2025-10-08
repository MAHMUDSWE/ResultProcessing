import { BaseEntity } from '@/common/entities/base.entity';
import { Course } from '@/course/entities/course.entity';
import { Student } from '@/student/entities/student.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_department')
export class Department extends BaseEntity {
    @PrimaryGeneratedColumn()
    dept_id: number;

    @Column({ length: 70, nullable: true })
    dept_name: string;

    @OneToMany(() => Course, (course) => course.department)
    courses: Course[];

    @OneToMany(() => Student, (student) => student.department)
    students: Student[];

    @OneToMany(() => Teacher, (teacher) => teacher.department)
    teachers: Teacher[];
}
