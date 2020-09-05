const Discord = require('discord.js');
const bot = new Discord.Client();
const {token, prefix} = require('./botconfig.json');

bot.on('ready', () => {
    console.log('Ready to be a epic mod!');
    bot.user.setActivity('over this server', { type: "WATCHING" })
        .catch(console.error);
})

bot.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();
    if (command === 'invite') {
        const Invite = new Discord.RichEmbed()
            .setColor(0x141716)
            .setTitle('Invite me!')
            .setDescription('Im a Epic Mod for Discord!')
            .setAuthor(message.author.username)
            .setThumbnail('https://ibb.co/yqbrHqj')
            .setFooter('Bot made by JebBlox#8746 and credits to Syskey#9713 for the logo')
            
            .setTimestamp()
        try {
            message.author.sendEmbed(Invite);
        } catch {
            message.reply(`Sorry <@${message.author.username}> I cannot message you make sure your dms are on`)
        }
    } else
        if (command === 'ban') { 

            if (message.member.hasPermission("BAN_MEMBERS")) {
                const userBan = message.mentions.users.first();

                if (userBan) {
                    var member = message.guild.member(userBan);

                    if (member) {
                        member.ban({
                            reason: 'You broke the rules or your friends do it for fun'
                        }).then(() => {
                            message.reply(`${userBan.tag} was banned from this server https://imgur.com/JGIcxj6`)
                        })

                    } else {
                        message.reply('that user is not in the server');
                    }
                } else {
                    message.reply('who do you want me to hit with the ban hammer? https://i.imgur.com/RkIfjMP.gif')
                }
            } else {
                message.reply('Hey you can not use that.')
            }




        } else
            if (command === 'kick') {

                if (message.member.hasPermission("KICK_MEMBERS")) {
                    const userKick = message.mentions.users.first();

                    if (userKick) {
                        var member = message.guild.member(userKick);

                        if (member) {
                            member.kick('you broke the rules or your friends do it as a joke').then(() => {
                                message.reply(`kicked ${userKick.tag}!`);
                            }).catch(err => {
                                message.reply('I was not able to kick that user.')
                                console.log(err);
                            })
                        } else {
                            message.reply('that user is not in the server')
                        }
                    } else {
                        message.reply('you need to state the person you want to kick.')
                    }
                } else {
                    message.reply('Hey you can not use that.')
                }




            } else
            if (command === 'say') {
                const sayMessage = args.join("");
                message.delete().catch(err => console.log(err));
                message.channel.send(sayMessage);
            } else
            if (command === 'ping') {
                message.channel.send('Finding the bots ping...').then(msg => {
                    const ping = msg.createdTimestamp;
                    msg.edit(`My ping is ${ping}ms`);
                })
            } else 
            if (command === 'membercount') {
                const membersInServer = message.guild.memberCount;
                const memberEmbed = new Discord.RichEmbed()
                .setTitle(`${message.guild.name} has ${membersInServer} members in the server!`);

                message.channel.send(memberEmbed);
            }
})

bot.login(token);