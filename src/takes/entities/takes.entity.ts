import { BaseEntity } from '@/common/entities/base.entity';
import { Course } from '@/course/entities/course.entity';
import { Student } from '@/student/entities/student.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_takes')
export class Takes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.takes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'reg_no' })
    student: Student;

    @ManyToOne(() => Course, (course) => course.takes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ length: 15, nullable: true })
    semester: string;

    @Column({ type: 'decimal', precision: 4, scale: 0, nullable: true })
    year: number;
}
