import { Column, Entity,JoinColumn,OneToMany,OneToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';
import { Post} from './Post'; // Assuming Posts is another entity defined in your project

@Entity({ name: 'users' })
export class User{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;
    
    @Column()
    createdAt: Date;

    @Column({nullable: true})
    authStrategy: string;
    
    @OneToOne(()=> Profile)
    @JoinColumn()
    profile:Profile;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]; 
}
