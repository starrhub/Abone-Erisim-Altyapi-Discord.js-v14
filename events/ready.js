const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.tag} olarak giriş yapıldı!`);
        
        client.user.setStatus('idle');
        client.user.setActivity('✨by Shell Co.', { type: ActivityType.Playing });
    }
};