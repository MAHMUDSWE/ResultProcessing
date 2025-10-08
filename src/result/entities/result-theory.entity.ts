import { BaseEntity } from '@/common/entities/base.entity';
import { Course } from '@/course/entities/course.entity';
import { Student } from '@/student/entities/student.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_result_theory')
export class ResultTheory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.theoryResults, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'reg_no' })
    student: Student;

    @ManyToOne(() => Course, (course) => course.theoryResults, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @ManyToOne(() => Teacher, (teacher) => teacher.firstTheoryResults, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'first_teacher_id' })
    firstTeacher: Teacher;

    @ManyToOne(() => Teacher, (teacher) => teacher.secondTheoryResults, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'second_teacher_id' })
    secondTeacher: Teacher;

    @Column({ type: 'int', nullable: true })
    class_attendance: number;

    @Column({ type: 'int', nullable: true })
    term_test: number;

    @Column({ type: 'int', nullable: true })
    class_assessment: number;

    @Column({ type: 'int', nullable: true })
    part_A: number;

    @Column({ type: 'int', nullable: true })
    part_B: number;

    @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true })
    total_mark: number;

    @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
    gpa: number;

    @Column({ length: 10, nullable: true })
    letter_grade: string;
}
