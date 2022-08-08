import { messageDataModel } from "../models/message-data-model";
class BotController {
  normalizeObject(arg: any) { return JSON.parse(JSON.stringify(arg)) };

  goodMoRandomReact(msg: any) {
    const gudmo = ["բարի լույս", "բարի առավոտ", "Բարի լույս", "Բարի առավոտ", "բարի օր", "Բարի օր", "լույս բարի", "Լույս բարի"];
    const gudmoReactions = ["🔆", "🔅", "🌇", "☀️", "🌞", "🌅"];
    const randomReaction = gudmoReactions[Math.floor(Math.random() * gudmoReactions.length)];
    if (gudmo.includes(msg.content)) {
      msg.react(randomReaction);
    }
  };


   async storeMsgsInDb(cleanMsgs: any) {
     cleanMsgs.forEach((cleanMsg: any) => {
       const newMessageData = new messageDataModel({
         content: cleanMsg.content,
         authorId: cleanMsg.authorId,
         id: cleanMsg.id,
         messageSentAt: cleanMsg.createdTimestamp,
       });

        newMessageData.save()
          .then()
          .catch((err: any) => { console.log(err) })
     });
   };

}

const botController = new BotController();
export { botController }