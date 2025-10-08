import { BaseEntity } from '@/common/entities/base.entity';
import { Course } from '@/course/entities/course.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('tbl_courseprerequisite')
export class CoursePrerequisite extends BaseEntity {
    @ManyToOne(() => Course, (course) => course.prerequisites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @ManyToOne(() => Course, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'prerequisite_id' })
    prerequisite: Course;
}
