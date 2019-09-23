const Discord = require('discord.js');

const discord_token = require('./secrets/discord_token.json');
const { Users } = require('./dbObjects');

const client = new Discord.Client();
const updates = new Discord.Collection();

const PREFIX = '!';

Reflect.defineProperty(updates, 'write', {
	value: async function write(id, username, update) {
        console.log(update);
		const user = updates.get(id);
		if (user) {
            user.addUpdate(update);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, username: username, max_day_num: 0 });
        newUser.addUpdate(update);
        newUser.save();
        updates.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(updates, 'getUpdates', {
	value: function getUpdates(id) {
		const user = updates.get(id);
        let result =  user ? user.getUpdates() : [];
        console.log(result);
        return result;
	},
});

Reflect.defineProperty(updates, 'getAllUpdates', {
	value: function getAllUpdates() {
        let allUpdates  = [];
        updates.forEach(u => allUpdates.concat(updates.getUpdates(u)));
        return allUpdates;
	},
});

client.once('ready', async () => {
    const storedUpdates = await Users.findAll();
    storedUpdates.forEach(u => updates.set(u.user_id, u));
    console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) return;

    if (message.channel.name === 'official-daily-updates') {
        updates.write(message.author.id, message.author.username, message.content);
    } else if (message.channel.name === 'bots') {
    }
});

client.login(discord_token.token);