const fs = require('fs')

module.exports = {
	name: 'about',
	description: 'About Avalon bot.',
	execute(message) {
		const Discord = require('discord.js');
		const aboutEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setTitle('Avalon')
			.setDescription('Avalon custom bot')
			.setTimestamp()
			.setFooter('coded by 𝙜𝙤𝙣𝙯𝙤#6131');

		message.channel.send(aboutEmbed);
	},
};