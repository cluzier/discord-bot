const fs = require('fs')
const Discord = require('discord.js');
const Client = require('./client/Client');
const moment = require('moment');
const sql = require('sqlite');
const {
	prefix,
	token,
} = require('./config.json');

sql.open('./cordLogs.sqlite');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', message => {
	if (message.content == 'ima head out' || message.content == 'Ima head out') {
		message.channel.send({
			files: ["https://i.kym-cdn.com/entries/icons/mobile/000/030/967/spongebob.jpg"]
		})
	}

	if (message.content == 'so no head' || message.content == 'So no head') {
		message.channel.send(`no ${message.author}, no head`);
	}

	//check channel from the message recieved
	let tStamp = moment().format('LLLL'); //creates time stamp

	if (message.channel.type == 'dm') { //checks for DM - Creates a DM DB and records
		let dmName = `${message.author.username}DM`;
		sql.run(`INSERT INTO ${dmName} (username, message, timestamp, userID) VALUES (?,?,?,?)`, [message.author.username, message.content, tStamp, message.author.id]).catch(() => {
			sql.run(`CREATE TABLE IF NOT EXISTS ${dmName} (username TEXT, message TEXT, timestamp TEXT, userID TEXT);`).then(() => {
				sql.run(`INSERT INTO ${dmName} (username, message, timestamp, userID) VALUES (?,?,?,?)`, [message.author.username, message.content, tStamp, message.author.id]);
			})
		})
	} else { //otherwise it's a normal channel
		sql.run(`INSERT INTO ${message.channel.name} (username, message, timestamp, userID) VALUES (?,?,?,?)`, [message.author.username, message.content, tStamp, message.author.id]).catch(() => {
			console.error;
			sql.run(`CREATE TABLE IF NOT EXISTS ${message.channel.name} (username TEXT, message TEXT, timestamp TEXT, userID TEXT);`).then(() => {
				sql.run(`INSERT INTO ${message.channel.name} (username, message, timestamp, userID) VALUES (?,?,?,?)`, [message.author.username, message.content, tStamp, message.author.id]);
			}) // KNOWN ISSUE: Does not like channels with "-" in them
		})
	}
})

client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	try {
		command.execute(message);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(token);