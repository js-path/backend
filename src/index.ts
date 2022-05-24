import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import discord, { Interaction, MessageManager } from "discord.js";
import { Client, Intents, Collection, TextChannel } from "discord.js";
import fs from "fs";
import { CronJob } from "cron";

import { router } from "./router/index";
import path from "path";
import { Request, Response } from "express";
import { channel } from "diagnostics_channel";
import { messageDataModel } from "./models/message-data-model";
import { memberModel } from "./models/member-model";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/", express.static(path.join(__dirname, "/../src/public/home_page")));
app.use("/login", express.static(path.join(__dirname, "/../src/public/login")));
app.use(
  "/register",
  express.static(path.join(__dirname, "/../src/public/register"))
);

app.use("/", router);

const start = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`[+] server started on port ${process.env.PORT}`);
    });
    await mongoose.connect(process.env.MONGO_DB_CONNNECT_STRING, () => {
      console.log("\n[+] mongodb connected");
    });
  } catch (e) {
    console.log(e);
  }
};

start();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`\n[+]Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  const gudmo = ["bari luys", "barior"];
  const gudmoReactions = ["🔆", "🔅", "🌇", "☀️", "🌞", "🌅"];
  const randomReaction =
    gudmoReactions[Math.floor(Math.random() * gudmoReactions.length)];
  const memberPoints = 0;

  if (msg.channel.id === "971007615649845248") {
    if (gudmo.includes(msg.content)) {
      msg.react(randomReaction);
    }
  }
});


// client.on("messageCreate", async (message) => {
//   // const channels = message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').toJSON()
//   // for (const channel of channels) {
//   //
//   // }
//   const channels = await message.channel.fetch();
//   console.log(channels)
//  })

client.on("messageCreate", async (msg) => {
  const messages = await msg.channel.messages.fetch();
  const filtered = messages
    .filter((m) => !(m.author.id === client.user.id))
    .toJSON();
  filtered.forEach((element: any) => {
    const newMessageData = new messageDataModel({
      message: element.content,
      username: element.author.tag,
      registeredAt: Date.now(),
      messageSentAt: element.createdTimestamp,
    });

    newMessageData
      .save()
      // .then(() => {
      //   console.log(newMessageData);
      // })
      .catch((e: any) => console.log(e));

     const newMember = new memberModel({
       username: element.author.tag,
       points: 0,
       registeredAt: Date.now(),
       id: element.author.id
     });

     newMember
       .save()
      //  .then(() => {
      //    console.log(newMember);
      //  })
       .catch((e: any) => console.log(e));
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);
