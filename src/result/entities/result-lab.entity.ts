import { BaseEntity } from '@/common/entities/base.entity';
import { Course } from '@/course/entities/course.entity';
import { Student } from '@/student/entities/student.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_result_lab')
export class ResultLab extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.labResults, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'reg_no' })
    student: Student;

    @ManyToOne(() => Course, (course) => course.labResults, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @ManyToOne(() => Teacher, (teacher) => teacher.labResults, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'first_teacher_id' })
    firstTeacher: Teacher;

    @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true })
    total_mark: number;

    @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
    gpa: number;

    @Column({ length: 10, nullable: true })
    letter_grade: string;
}
