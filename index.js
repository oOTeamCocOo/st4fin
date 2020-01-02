const Discord = require("discord.js");

const client = new Discord.Client();

var prefix = "s!";

client.on('ready', () => {
    console.log('logged in as ' + client.user.tag)
    client.user.setActivity('ST4RII sur youtube',{type: 'WATCHING'})
});

client.login(process.env.TOKEN)

client.on('message' , message => {
    if(message.content === prefix +'reglement') {
        var reglement_embed = new Discord.RichEmbed()
        .setColor('f3f800')
        .setTitle('```REGLEMENT```')
        .setDescription('MON PREFIX EST "*" \n\n1) Pas de everyone sur notre serveur.\n\n 2) Les insultes sont interdites et seront sanctionnés.\n\n 3) Pas de pubs pour vos serveurs discord.\n\n 4) Ajouter le not avec la commande *invite.\n\n 5) Les liens inappropriés comme des screamers et des sites pornographiques sont automatiquement supprimés.\n\n 6) Ne pas spammer/flood, utiliser trop de caractères spéciaux ou encore écrire de longs messages en MAJUSCULES.\n\n 7) Respectez tous les membres de façon égale et soyez gentils les uns envers les autres. Si vous avez des problèmes avec quelqu un ou que vous vous sentez harcelé, contactez un membre du staff.\n\n\n-------------------------------------------')
        .setFooter('réglement 2019')
        .setTimestamp()
        message.channel.sendMessage(reglement_embed)
        console.log('le reglement à été demandé')
    }
});


client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
    }
});

//ban
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
    }
});
//join
client.on('guildMemberAdd', member =>{
    let join_embed = new Discord.RichEmbed()
        .setTitle('BIENVENU')
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('661986091687215132').send(join_embed)
    member.addRole('662381470702370846')
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
        member.guild.channels.get('661986091687215132')
        }
 );
 //left
client.on('guildMemberRemove', member =>{
    let leave_embed = new Discord.RichEmbed()
        .setTitle('AUREVOIR')
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('661986091687215132').send(leave_embed)
 
});

client.on('message', msg => {
  var memberCount = client.users.size;
  var servercount = client.guilds.size;
  if(msg.content === prefix + "info")
  var infos_embed = new Discord.RichEmbed()
      .setTitle("INFO ST4RII BOT")
      .setColor('ff9300')
      .setFooter('Crée par oOTeamCocOo')
      .setTimestamp()
      .addField("Vous êtes " + memberCount + " users à m'utiliser"," Merci à vous tous", false)
      .addField("Je suis sur "+ servercount + " serveurs "," Merci de votre fidèlité", false)
    msg.channel.send(infos_embed)
});
