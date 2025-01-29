# Abone Erişim Sistemi Discord.js v14 Altyapısı

Bu altyapı, Discord.js v14 kullanılarak kodlanmış bir abone erişim sistemi altyapısıdır.

## 🔧 Kurulum

### Gereksinimler
- [Node.js](https://nodejs.org/en/) (v16.9.0 veya üstü)
- Bir metin editörü (örn: VSCode, Sublime Text)
- Bir Discord botu ([Discord Developer Portal](https://discord.com/developers/applications))

### Adımlar
1. Bu repoyu indirin:

Bu projeyi indirin ve metin editöründe açın.

2. Gerekli modülleri yükleyin:
```bash
npm install
```

3. `config.json` dosyasını düzenleyin:
```json
{
    "token": "BOT_TOKEN",
    "mainGuildId": "ANA_SUNUCU_ID",
    "subGuildId": "ALTYAPI_SUNUCU_ID",
    "subscriberRoleId": "ABONE_ROL_ID",
    "accessRoleId": "ERİŞİMLİ_ROL_ID",
    "noAccessRoleId": "ERİŞİMSİZ_ROL_ID",
    "logChannelId": "LOG_KANAL_ID"
}
```

4. Botu başlatın:
```bash
node .
```

## 📝 Özellikler
- Bot belirlenen sunucuda, belirlenen role sahip olan üyelere erişim rolü verir. Bu şekilde kod, altyapı vb. kanallara ulaşabilir.
- Üye ana sunucudan ayrıldığında veya belirlenen rol alındığında erişim rolü otomatik alınır ve erişimsiz rolü verilir.
- Log kanalı ile hangi üye için ne işlemi yapıldığını görebilirsiniz.

## 🤝 Destek
Herhangi bir sorun için [Shell Co.](https://discord.gg/ekePqzFJUz) Discord sunucumuza katılabilirsiniz.

## 📜 Lisans
Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

## ⭐ Star
Beğendiyseniz star atmayı unutmayın!

---
Developed with ❤️ by [Shell Co.](https://discord.gg/ekePqzFJUz)
