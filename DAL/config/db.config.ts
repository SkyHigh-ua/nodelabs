import { DataSourceOptions } from 'typeorm'
import { UserEntity } from '../entities/users.entity'
import { PostEntity } from '../entities/posts.entity'

export const db: DataSourceOptions = 
{
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: '--',
    password: '--',
    database: '--',
    entities: [
        UserEntity,
        PostEntity
    ],
    synchronize: true,
    logging: true,
    migrations: [
        "../migrations/*.ts"
    ]
};