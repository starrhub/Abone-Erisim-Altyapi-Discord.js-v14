const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (oldMember.guild.id !== config.mainGuildId) return;
    const subGuild = client.guilds.cache.get(config.subGuildId);
    if (!subGuild) return;
    const subGuildMember = subGuild.members.cache.get(newMember.id);
    if (!subGuildMember) return;
    const hadRole = oldMember.roles.cache.has(config.subscriberRoleId);
    const hasRole = newMember.roles.cache.has(config.subscriberRoleId);

    const logChannel = client.channels.cache.get(config.logChannelId);

    if (!hadRole && hasRole) {
        await subGuildMember.roles.add(config.accessRoleId);
        await subGuildMember.roles.remove(config.noAccessRoleId);

        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Erişim Rolü Verildi')
                .setDescription(`${newMember.user.tag} kullanıcısına erişim rolü verildi.`)
                .setTimestamp();
            logChannel.send({ embeds: [logEmbed] });
        }
    } else if (hadRole && !hasRole) {
        await subGuildMember.roles.remove(config.accessRoleId);
        await subGuildMember.roles.add(config.noAccessRoleId);

        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Erişim Rolü Alındı')
                .setDescription(`${newMember.user.tag} kullanıcısından erişim rolü alındı.`)
                .setTimestamp();
            logChannel.send({ embeds: [logEmbed] });
        }
    }
});

client.on('guildMemberRemove', async (member) => {
    if (member.guild.id !== config.mainGuildId) return;
    const subGuild = client.guilds.cache.get(config.subGuildId);
    if (!subGuild) return;
    const subGuildMember = subGuild.members.cache.get(member.id);
    if (!subGuildMember) return;
    await subGuildMember.roles.remove(config.accessRoleId);
    await subGuildMember.roles.add(config.noAccessRoleId);

    const logChannel = client.channels.cache.get(config.logChannelId);
    if (logChannel) {
        const logEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Erişim Rolü Alındı')
            .setDescription(`${member.user.tag} sunucudan ayrıldığı için erişim rolü alındı.`)
            .setTimestamp();
        logChannel.send({ embeds: [logEmbed] });
    }
});

client.on('guildMemberAdd', async (member) => {
    if (member.guild.id !== config.subGuildId) return;
    const mainGuild = client.guilds.cache.get(config.mainGuildId);
    if (!mainGuild) return;
    const mainGuildMember = mainGuild.members.cache.get(member.id);
    
    const logChannel = client.channels.cache.get(config.logChannelId);

    if (!mainGuildMember) {
        await member.roles.add(config.noAccessRoleId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Erişim Rolü Verilmedi')
                .setDescription(`${member.user.tag} ana sunucuda olmadığı için erişim rolü verilmedi.`)
                .setTimestamp();
            logChannel.send({ embeds: [logEmbed] });
        }
        return;
    }

    if (mainGuildMember.roles.cache.has(config.subscriberRoleId)) {
        await member.roles.add(config.accessRoleId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Erişim Rolü Verildi')
                .setDescription(`${member.user.tag} kullanıcısına erişim rolü verildi.`)
                .setTimestamp();
            logChannel.send({ embeds: [logEmbed] });
        }
    } else {
        await member.roles.add(config.noAccessRoleId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Erişim Rolü Verilmedi')
                .setDescription(`${member.user.tag} abone olmadığı için erişim rolü verilmedi.`)
                .setTimestamp();
            logChannel.send({ embeds: [logEmbed] });
        }
    }
});

client.login(config.token);