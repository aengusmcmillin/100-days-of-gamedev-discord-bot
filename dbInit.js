const Sequelize = require('sequelize');

const sequelize = new Sequelize('user_update_storage', 'admin', 'admin', {
    host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	storage: 'user_update_storage.sqlite',
})

sequelize.import('models/UserUpdates');
sequelize.import('models/Users');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);