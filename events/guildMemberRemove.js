const config = require('../config.json');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        if (member.guild.id !== config.mainGuildId) return;

        const subGuild = member.client.guilds.cache.get(config.subGuildId);
        if (!subGuild) return;

        const subGuildMember = subGuild.members.cache.get(member.id);
        if (!subGuildMember) return;

        try {
            await subGuildMember.roles.remove(config.accessRoleId);
            await subGuildMember.roles.add(config.noAccessRoleId);
            console.log(`[BAŞARILI] ${member.user.tag} ana sunucudan ayrıldığı için altyapı erişimi kaldırıldı.`);
        } catch (error) {
            console.error(`[HATA] Rol güncelleme hatası: ${error}`);
        }
    }
};