import { DataSource } from 'typeorm'
import { db } from './db.config'

const datasource = new DataSource(db);
datasource.initialize();
export default datasource;