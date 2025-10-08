import { BaseEntity } from '@/common/entities/base.entity';
import { Course } from '@/course/entities/course.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_teach')
export class Teach extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Teacher, (teacher) => teacher.teaches, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'teacher_id' })
    teacher: Teacher;

    @ManyToOne(() => Course, (course) => course.teaches, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ length: 15, nullable: true })
    semester: string;

    @Column({ type: 'decimal', precision: 4, scale: 0, nullable: true })
    year: number;
}
