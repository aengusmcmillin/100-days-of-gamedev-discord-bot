const Sequelize = require('sequelize');

const sequelize = new Sequelize('user_update_storage', 'admin', 'admin', {
    host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'user_update_storage.sqlite',
})

const pubWriteUpdate = require('./sheets.js');

const Users = sequelize.import('models/Users');
const UserUpdates = sequelize.import('models/UserUpdates');

UserUpdates.belongsTo(Users, {foreignKey: 'user_id', as: 'user'});

Users.prototype.addUpdate = async function(update) {
    var today = new Date();
    var ds = today.toLocaleDateString("en-US");
    var next_day = this.max_day_num + 1;
    if (this.last_update_ds === ds) {
        console.log("Already updated today");
        next_day = this.max_day_num;
    }

    this.last_update_ds = ds;
    this.max_day_num = next_day;
    pubWriteUpdate(ds, next_day, this.username, update);
    return UserUpdates.create({ user_id: this.user_id, update: update, date: ds, day_num: next_day });
}

Users.prototype.getUpdates = function() {
    return UserUpdates.findAll({
        where: { user_id: this.user_id },
        include: ['item'],
    });
}

module.exports = { Users, UserUpdates };