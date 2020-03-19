const fs = require('fs')

module.exports = {
    name: 'ping',
    description: 'Ping the bot',
    async execute(message) {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.ping)}ms`);
    }
}