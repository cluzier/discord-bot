const fs = require('fs')

module.exports = {
    name: 'help',
    description: 'List all available commands',
    execute(message) {
        const Discord = require('discord.js');
        const helpEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Avalon')
            .addField('help', 'List all available commands')
            .addField('about', 'About Avalon bot')
            .addField('userinfo', 'Get information about a user')
            .addField('ping', 'Ping the bot')
            .addField('purge', 'clear messages in a channel')
            .setTimestamp()
            .setFooter('coded by 𝙜𝙤𝙣𝙯𝙤#6131');

        message.channel.send(helpEmbed);
    },
};