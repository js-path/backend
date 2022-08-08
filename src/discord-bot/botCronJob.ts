import { CronJob } from "cron";
import { discordExec } from "./discord.bot";

const cronJobForMessages = new CronJob("1 * * * * *",discordExec);

export { cronJobForMessages }