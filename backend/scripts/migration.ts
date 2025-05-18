import {AppDataSource} from "../ormconfig";

AppDataSource.initialize()
    .then(() => {
        return AppDataSource.runMigrations();
    })
    .then(() => {
        console.log('✅ Migrations ran successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    });