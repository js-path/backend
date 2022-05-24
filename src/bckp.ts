// client.on("messageCreate", async (msg) => {
//     const channelIds = process.env.CHANNELS.split(" ");
//      channelIds.forEach(async(channelId) => {
//         const messages = await msg.guild.channels.cache.get(channelId)
//         console.log(messages)
      //   const filtered = messages
      //     .filter((m:any) => !(m.author.id === client.user.id))
      //     .toJSON();
      //   filtered.forEach((element: any) => {
      //     const newMember = new messageDataModel({
      //       message: element.content,
      //       username: element.author.tag,
      //       registeredAt: Date.now(),
      //       messageSentAt: element.createdTimestamp,
      //     });

      //     newMember
      //       .save()
      //       .then(() => {
      //         console.log(newMember);
      //       })
      //       .catch((e: any) => console.log(e));
      //   });
    //    });
    //  });





// client.on("messageCreate", async (msg) => {
//     const messages = await msg.channel.messages.fetch();
//     const filtered = messages
//       .filter((m) => !(m.author.id === client.user.id))
//       .toJSON();
//     filtered.forEach((element: any) => {
//       const newMember = new messageDataModel({
//         message: element.content,
//         username: element.author.tag,
//         registeredAt: Date.now(),
//         messageSentAt: element.createdTimestamp,
//       });

//       newMember
//         .save()
//         .then(() => {
//           console.log(newMember);
//         })
//         .catch((e: any) => console.log(e));
//     });
//   }
// );




//   addMemberToDb:{
//         data: new SlashCommandBuilder()
//           .setName('addMemberToDb')
//           .setDescription('collects members in database'),
//       async execute(msg:any) {
//                 const newMember = new memberModel({
//                        username : msg.author.tag ,
//                        points : memberPoints
//                    })
//                    newMember.save()
//                    .catch((err)=>{
//                        console.log(err)
//                    })
//       },
//          showPointsList : {
//          data: new SlashCommandBuilder()
//           .setName('showPointsList')
//           .setDescription('shows a list of members and their points (sorted)'),
//       async execute(msg:any) {
//                 if (msg.content==='$list'){
//                       await console.log(memberModel.find({},{_id:0}).sort({"points":-1}))
//                  }
//       }
//          }
//   }


// client.on('messageCreate',(msg)=>{
//     if(msg.channel.id === '971007615649845248'){
//         if (gudmo.includes(msg.content)){
//             if(msg.author.id ==='891761471082606613'){
//                  msg.channel.send('qez barev chka ay lox')
//              }  else {msg.react(randomReaction);}
//         }
//     }
//    });

// const registerMember = async (msg:any)=>{
//     const newMember = new memberModel({
//          username: msg.author.tag,
//          points: 0,
//          id: msg.author.id,
//          registeredAt: Date.now()
//      })
//      await newMember.save().catch(e => console.log(e));
//      return newMember;
//  };


//  const registerMember = async (msg:any)=>{

    //     const newMember = new memberModel({
    //          username: guild.members. ,
    //          points: 0,
    //          id: ,
    //          registeredAt: Date.now()
    //      })
    //      await newMember.save().catch(e => console.log(e));
    //      return newMember;
    //  };

    // class DiscordMongoDBEconomy {

    //     constructor() {
    //         throw new Error('Not a constructor');
    //     }
    //     /**
    //      * Create a member if there are no entry in the database for him
    //      * @param {string} memberId - The id of the member
    //      * @param {string} guildId - The id of the guild
    //      */
    //     static async createMember(memberId:any, guildId:any) {
    //         if (!memberId) throw new TypeError("A member id must be specified.");
    //         if (!guildId) throw new TypeError("A guild id must be specified.");

    //         const existent = await memberModel.findOne({
    //             id: memberId,
    //             guildID: guildId
    //         });
    //         if (existent) return false;

    //         const create = new memberModel({
    //             id: memberId,
    //             guildID: guildId
    //         });

    //         await create.save().catch(e => console.log(`An error occured while creating the member: \n ${e.message}`));

    //         return create;
    //     }
    // }
    // Object.assign(DiscordMongoDBEconomy)






