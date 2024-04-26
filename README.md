# OctaNuker
This script automates the destruction and flooding of a Discord server with the use of the Discord.js library and a Discord bot.

## How to Use

### Create a Discord Bot

First you need to create a Discord Bot. If you already have one you can skip these steps.
1. Go to the [Discord Developer Portal](https://discord.com/developers)
2. Create a new application
3. Create a bot for the application and customize it the way you want
4. Enable all **Privileged Gateway Intents**
5. **Regenerate the Token** and note it down for later

### Using the script

1. Install Node.js and npm
> [!NOTE]
> You can install Node.js and npm the following ways:
> 
> **Debian:** ``sudo apt install nodejs npm``
> 
> **Arch:** [See ArchWiki](https://wiki.archlinux.org/title/Node.js)
> 
> **Windows:** [Node.js](https://nodejs.org/en/download)

2. Clone the repository

```git clone https://github.com/Raryente/okrd-discord-nuker.git```

5. Switch to the directory:

 ```cd okrd-discord-nuker```

6. Install the dependencies

```npm update```

7. Authorize your bot

Open ``.env`` and type the following:
```
TOKEN=YOUR-TOKEN-HERE
```
Replace the token with the token of your discord bot. *(The one you noted down)*

8. Check if it worked by typing ```node .```
> [!TIP]
> The script was successful if you got ```Logged in as x#xxxx```

9. Configure the bot using config.json

10. Invite the bot to the target server. The nuke command is !nuke
    
