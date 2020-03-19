module.exports = {
	name: 'userinfo',
	description: 'Get information about a user.',
	execute(message) {
		const Discord = require("discord.js");
		let ment = message.mentions.users.first();
		if (!ment) {
			message.channel.send('Please mention a user!')
		}
		// Creats an embed with information about the mentioned user
		let embed = new Discord.RichEmbed()
			.addField("Username", ment.tag)
			.addField("ID", ment.id)
			.addField("Status", ment.presence.status)
			.addField("Created", ment.createdAt)
			.setThumbnail(ment.avatarURL)
		message.channel.send(embed)
	},
};