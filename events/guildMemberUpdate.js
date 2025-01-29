const config = require('../config.json');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        try {
            if (oldMember.guild.id !== config.mainGuildId) return;

            const subGuild = oldMember.client.guilds.cache.get(config.subGuildId);
            if (!subGuild) return;

            const subGuildMember = subGuild.members.cache.get(newMember.id);
            if (!subGuildMember) return;

            const hadRole = oldMember.roles.cache.has(config.subscriberRoleId);
            const hasRole = newMember.roles.cache.has(config.subscriberRoleId);

            if (!hadRole && hasRole) {
                try {
                    await subGuildMember.roles.add(config.accessRoleId);
                    await subGuildMember.roles.remove(config.noAccessRoleId);
                    console.log(`[BAŞARILI] ${newMember.user.tag} kullanıcısına altyapı sunucusunda erişim verildi.`);
                } catch (error) {
                    console.error(`[HATA] Rol verme işlemi başarısız: ${error.message}`);
                }
            } else if (hadRole && !hasRole) {
                try {
                    await subGuildMember.roles.remove(config.accessRoleId);
                    await subGuildMember.roles.add(config.noAccessRoleId);
                    console.log(`[BAŞARILI] ${newMember.user.tag} kullanıcısının altyapı sunucusundaki erişimi kaldırıldı.`);
                } catch (error) {
                    console.error(`[HATA] Rol alma işlemi başarısız: ${error.message}`);
                }
            }
        } catch (error) {
            console.error(`[HATA] Genel bir hata oluştu: ${error.message}`);
        }
    }
};