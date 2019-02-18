/**
 *
 * Runs a javascript code execution bot.
 *
 * Get your token from https://discordapp.com/developers/applications/me/
 *
 */
require('dotenv').config();

const { VM } = require('vm2');
const vm     = new VM({
                          timeout: 1000,

                      });

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

//
// Cleans things up
//
const clean = text => {

    if (typeof (text) === 'string') {

        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));

    }

    return text;

};

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {

    console.log(`${new Date().toString()} bot started!`);

});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {

    //
    // Prevent replying to self
    //
    if (message.author.bot) return;

    //
    // Check if the message starts with the `>` trigger
    //
    if (message.content.indexOf('>') === 0) {

        //
        // Get the user's message excluding the `>`
        //
        const text = message.content.substring(1);

        try {

            //
            // Execute javascript code in sandbox
            //
            const result = vm.run(`(${text})`);

            console.log(`${new Date().toString()} ${message.author.username}: ${text} = ${result}`);

            //
            // Send message reply
            //
            message.reply(`\`OUTPUT\` \`\`\`xl\n${(result)}\n\`\`\``);

        } catch (err) {

            console.log('error:', err.message);

            //
            // Send message reply
            //
            message.reply(`\`ERROR\` \`\`\`xl\n${clean(err.message)}\n\`\`\``);

        }

    } else if (message.content.indexOf('!') === 0) {

        if (message.content === '!version') {

            message.reply('Version: ' + process.env.VERSION);

        } else {

            message.reply('unknown command');

        }

    }

});

//
// Login.. (start things up)
//
bot.login(process.env.TOKEN);

