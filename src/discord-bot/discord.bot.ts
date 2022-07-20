import discord, {
  Intents,
  Client,
  Interaction,
  MessageManager,
} from "discord.js";
import { messageDataModel } from "../models/message-data-model";
import { CronJob } from "cron";

const discordExec = () => {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  client.on("ready", () => {
    console.log(`\n[+]Logged in as ${client.user.tag}!`);
  });

  client.on("messageCreate", (msg) => {
    const gudmo = ["bari luys", "barior"];
    const gudmoReactions = ["🔆", "🔅", "🌇", "☀️", "🌞", "🌅"];
    const randomReaction = gudmoReactions[Math.floor(Math.random() * gudmoReactions.length)];
    const memberPoints = 0;

    if (msg.channel.id === "971007615649845248") {
      if (gudmo.includes(msg.content)) {
        msg.react(randomReaction);
      }
    }
  });

  client.on("messageCreate", async (message) => {
    const channels = message.guild.channels.cache
      .filter((c) => c.type === "GUILD_TEXT")
      .toJSON();
    ////////////
    const job = new CronJob(
      "* 13 * * * *",
      () => {
        // CRON STARTS HERE
        for (const kanal of channels) {
          const allMessages = (
            kanal as { messages: MessageManager }
          ).messages.fetch({ limit: 1 });
          allMessages.then((result): void => {
            const cleanMsgs = JSON.parse(JSON.stringify(result));
            cleanMsgs.forEach((cleanMsg: any) => {
              const newMessageData = new messageDataModel({
                content: cleanMsg.content,
                author: "krutoyBratanchik", // cleanMsg.author,
                id: cleanMsg.id,
                messageSentAt: cleanMsg.createdTimestamp,
              });

              newMessageData
                .save()
                .then(() => {
                  console.log(newMessageData);
                })
                .catch((e: any) => console.log(e));
            });
          });
        }
        //BRACKETS BELOW BELONG TO  CRONJOB
      },
      null,
      true
    );
    // CRON ENDS HERE
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
};

export { discordExec };
