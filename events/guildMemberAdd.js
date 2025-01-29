const config = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        if (member.guild.id !== config.subGuildId) return;

        const mainGuild = member.client.guilds.cache.get(config.mainGuildId);
        if (!mainGuild) return;

        const mainGuildMember = mainGuild.members.cache.get(member.id);

        try {
            if (!mainGuildMember) {
                await member.roles.add(config.noAccessRoleId);
                console.log(`[BAŞARILI] ${member.user.tag} ana sunucuda olmadığı için erişimsiz rol verildi.`);
                return;
            }

            if (mainGuildMember.roles.cache.has(config.subscriberRoleId)) {
                await member.roles.add(config.accessRoleId);
                console.log(`[BAŞARILI] ${member.user.tag} abone olduğu için altyapı erişimi verildi.`);
            } else {
                await member.roles.add(config.noAccessRoleId);
                console.log(`[BAŞARILI] ${member.user.tag} abone olmadığı için erişimsiz rol verildi.`);
            }
        } catch (error) {
            console.error(`[HATA] Rol verme hatası: ${error}`);
        }
    }
};