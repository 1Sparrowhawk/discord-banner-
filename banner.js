const Discord = require('discord.js')
const db = require('quick.db')
const axios = require("axios");
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'banner',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
        
      
        let user = message.mentions.users.first() || message.author;
        
        try {
          
            const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
                headers: {
                    Authorization: `Bot ${client.token}`
                }
            }).then(d => d.data);
            if(data.banner){
               
                let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
                url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
                
                 const embed = new Discord.MessageEmbed()
                 .setTitle(`Banner`)
                 .setDescription(`**Banner of** ${user}:`)
                 .setColor(color)
                 .setImage(url);
             message.channel.send(embed)
       
       
      
            } else {
                message.channel.send(":x: **User has no Banner**")
            }
           
          
        }catch(e){
            console.log(e)
        }
    }
}