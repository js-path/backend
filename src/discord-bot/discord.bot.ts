import discord, {
  Intents,
  Client,
  MessageManager
}
  from "discord.js";
import fs from "fs";
import { botController } from "./botController";


const discordExec = async () => {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  });
  client.on("ready", async () => {
    console.log(`\n[+]Logged in as ${client.user.tag}!`);
    const channels = client.channels.cache.filter((c: any) => c.type === "GUILD_TEXT").toJSON()
    for (const oneChannel of channels) {
      const allMessages = (oneChannel as { messages: MessageManager }).messages.fetch({ limit: 1 })

      allMessages.then((result): void => {
        const cleanMsgs = botController.normalizeObject(result);
        botController.storeMsgsInDb(cleanMsgs)
      });
    };
  });



  client.login(process.env.DISCORD_BOT_TOKEN);

};

export { discordExec };
