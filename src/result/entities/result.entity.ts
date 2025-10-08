import { BaseEntity } from '@/common/entities/base.entity';
import { Course } from '@/course/entities/course.entity';
import { Student } from '@/student/entities/student.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity('tbl_result')
export class Result extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'reg_no' })
    student: Student;

    @ManyToOne(() => Course, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
    gpa: number;

    @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
    course_credits: number;
}
