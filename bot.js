const Discord = require('discord.js');

const client = new Discord.Client();
const PREFIX = '!msg ';
var flipflop;

var tableauMessageMemberId = [];
var tableauChannel = [];
var tableauStep = [];
var tableauTitle = [];
var tableauDescription = [];
var tableauTimeCode = [];
var tableauFooter = [];
var tableauColor = [];
var tableauImage = [];
var tableauThumbnail = [];
var tableauUrl = [];
var tableauToken = [];

client.on('ready', () => {
    console.log("Bot online");

    /*const embed = new Discord.MessageEmbed()
        .setTitle("titre")
        .setDescription("description")
        .setImage("https://lh3.googleusercontent.com/proxy/ZxjUk1LTb67n7Coi2RkwIACfBs6DhU5IRuBJynxV2n5ZIS-PC2cy8PYTC5ZejChFFytYt3gUPFdKf3dziDuXlrffc54deZEUN3xDiORfNFoATv8I")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/fr/thumb/0/05/Discord.svg/1200px-Discord.svg.png")
    client.channels.cache.get('626781840765747201').send(embed);*/

    setInterval(interval, 3000);
    function interval(){
        if(flipflop === 0){
            flipflop = 1;
            client.user.setActivity("Made by Axel ROGET");
        } else {
            flipflop = 0;
            client.user.setActivity("!msg help");
        }

        const date = new Date();
        var timeCode = ("0"+date.getDate()).slice(-2) +"/"+("0"+(date.getMonth()+1)).slice(-2) + "/" + ("0"+(date.getHours()+1)).slice(-2) + "/" + ("0"+date.getMinutes()).slice(-2);
        //var timeCode = ("0"+date.getMinutes()).slice(-2) +"/"+ ("0"+(date.getHours()+1)).slice(-2) +"/"+ ("0"+date.getDate()).slice(-2) +"/"+ ("0"+(date.getMonth()+1)).slice(-2);
        console.log(timeCode);

        if(tableauTimeCode.indexOf(timeCode) !== -1){ // si il y a quelque chose à annoncer :
            console.log("Annonce !");

            var index = tableauTimeCode.indexOf(timeCode);

            const embed = new Discord.MessageEmbed()
            .setTitle(tableauTitle[index])
            .setDescription(tableauDescription[index])
            .setImage(tableauImage[index])
            .setThumbnail(tableauThumbnail[index])
            .setColor(tableauColor[index])
            .setURL(tableauUrl[index])
            if(tableauFooter[index]){
                embed.setFooter(tableauFooter[index] + "\n\nMade by Axel ROGET :\nhttps://instagram.com/axel_roget")
            } else {
                embed.setFooter("Made by Axel ROGET :\nhttps://instagram.com/axel_roget")
            }
        client.channels.cache.get(tableauChannel[index]).send(embed);
        tableauTimeCode[index] = "avowed";
        }
    }
});


client.on('message', message =>{
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case 'help':
            const embed = new Discord.MessageEmbed()
                .setTitle("Messages programmés :")
                .setDescription("**!msg add [#channel]** pour ajouter un message programmé (le reste du paramétrage se fera en message privé)\n\n**!msg edit [code unique]** pour modifier un message programmé déjà existant.")
                .setColor('#fb6615')
                .setFooter("Permission \"gérer les messages\" requise")
            message.channel.send(embed);
            break;
        
        case 'add':
            console.log("Add");
            if(message.channel.type === 'text' && message.member.permissions.has("MANAGE_MESSAGES") &&  args[1] && client.channels.cache.has(args[1].substring(2).slice(0, -1))){
                message.channel.bulkDelete(1);
                const embed = new Discord.MessageEmbed()
                    .setTitle("Création d'un message programmé :")
                    .setDescription("Nous avons presque fini de créer votre message mais il nous manque quelques informations :\n**Commencez par donner un titre à votre annonce...**")
                    .setColor('#fb6615')
                message.member.send(embed);

                console.log("MemberID = " + message.member.id);
                tableauMessageMemberId.push(message.member.id);
                console.log("Tableau memberId : " + tableauMessageMemberId);
                tableauChannel[tableauMessageMemberId.indexOf(message.member.id)] = args[1].substring(2).slice(0, -1);
                console.log("tableauChannel : " + tableauChannel);
                tableauStep[tableauMessageMemberId.indexOf(message.member.id)] = 1;
                console.log("tableauStep : " + tableauStep);
                }   else { // erreur lors de la création de l'annonce
                    const embedError = new Discord.MessageEmbed()
                        .setTitle("Erreur lors de la création de l'annonce :")
                        .setDescription("L'erreur peut provenir :\n\n-Du manque de la permission nécessaire.\n\n-La commande n'a pas été effectuée dans un serveur.\n\n-Il manque un ou plusieurs arguments.\n\n-Le channel sélectionné n'est pas un channel valide.")
                        .setFooter("!msg add [channel]")
                        .setColor("#ff0000")
                    message.channel.send(embedError);
                }
            break;

        case 'edit':
            if(tableauToken.indexOf(args[1]) !== -1){
                var index = tableauToken.indexOf(args[1]);
                tableauStep[index] = 4;
                tableauMessageMemberId[index] = message.author.id;

                if(message.channel.type === 'text'){message.channel.bulkDelete(1);}

                const embed = new Discord.MessageEmbed()
                    .setTitle("Modification du message :")
                    .setDescription("Vous pouvez utiliser :\n\n**finish** pour sauvegarder.\n\n**preview** pour visualiser l'annonce.\n\n**date** pour modifier la date et l'heure de publication de l'annonce.\n\n**footer [texte]** pour ajouter un pied de page.\n\n**color [couleur]** pour personnaliser la couleur de l'annonce. Choix possibles : [rouge], [orange] et [vert] sinon utiliser une couleur hexadécimale.\n\n**image [URL de l'image]** pour ajouter une image en dessous de l'annonce.\n\n**thumbnail [URL de l'image]** pour ajouter une image en haut à droite.\n\n**url [URL]** pour ajouter un lien. Cela rendra le titre cliquable.\n\n**cancel** pour annuler l'annonce. Cette action est irréversible.")
                    .setColor('#57ad44')
                if(message.channel.type === 'text'){message.member.send(embed);} else {message.reply(embed);}

            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Erreur !")
                    .setDescription("Veuillez inclure un code valide.")
                    .setFooter("!msg edit [code unique]")
                    .setColor('#ff0000')
                message.channel.send(embed);
            }
            return;
    }

    if(message.channel.type === 'dm' && tableauMessageMemberId.indexOf(message.author.id) !== -1 ){
        var step = tableauStep[tableauMessageMemberId.indexOf(message.author.id)];

        var index = tableauMessageMemberId.indexOf(message.author.id); // get index

        console.log("Step : " + step);

        if(step === 1){ // 1èere étape
            tableauTitle[index] = message.content;
            console.log("TableauTitle : " + tableauTitle);
            console.log("Id du channel dans lequel il faut envoyer le msg : " + tableauChannel[index]);
            tableauStep[index] = 2;
            const embed = new Discord.MessageEmbed()
                .setTitle("Création d'un message programmé :")
                .setDescription("Parfait, le titre de l'annonce est __" + message.content + "__.\n**Choisissez maintenant le corps de l'annonce...**")
                .setColor('#fb6615')
                .setFooter("Utilisez \\n pour passer à la ligne (fonctionnalité pas encore disponible)")
            message.channel.send(embed);
            
        } else if(step === 2){ // 2ème étape
            tableauStep[index] = 3;
            tableauDescription[index] = message.content;

            const embed = new Discord.MessageEmbed()
                .setTitle("Création d'un message programmé :")
                .setDescription("Excellent, la description de l'annonce est __" + message.content + "__.\nPassons au moment de publication de l'annonce :\nSélectionnez maintenant une date et une heure de publication.")
                .setFooter("Veuillez respecter la forme suivante : (sans crochets)\n[jour] [mois] [heure] [minute]\nChaque argument doit être en 2 chiffres.\nPar exemple : 5 heures >>> 05\n\nVous pouvez aussi utiliser __**now**__ au lieu de la commande pour publier le message dès l'utilisation de **finish**")
                .setColor('#fb6615')
            message.channel.send(embed);
        } else if(step === 3){ // 3ème étape
            let args = message.content.split(" ");
            
            console.log(args[3]);
            if(args[3]){
            tableauStep[index] = 4;
            tableauTimeCode[index] = args[0]+"/"+args[1]+"/"+args[2]+"/"+args[3]; // tableauTimeCode
            console.log("tableauTimeCode : " + tableauTimeCode); // dev only

            const embed = new Discord.MessageEmbed() // Embed pour les options facultative
                .setTitle("Quelques finitions :")
                .setDescription("Votre message est finit ! Utilisez les fonctions pour aller plus loin :\n\n**finish** pour sauvegarder.\n\n**preview** pour visualiser l'annonce.\n\n**date** pour modifier la date et l'heure de publication de l'annonce.\n\n**footer [texte]** pour ajouter un pied de page.\n\n**color [couleur]** pour personnaliser la couleur de l'annonce. Choix possibles : [rouge], [orange] et [vert] sinon utiliser une couleur hexadécimale.\n\n**image [URL de l'image]** pour ajouter une image en dessous de l'annonce.\n\n**thumbnail [URL de l'image]** pour ajouter une image en haut à droite.\n\n**url [URL]** pour ajouter un lien. Cela rendra le titre cliquable.\n\n**cancel** pour annuler l'annonce. Cette action est irréversible.")
                .setColor('#57ad44')
            message.channel.send(embed);

            } else if(message.content === "now"){ // Utilisation de "now"
                tableauStep[index] = 4;
                tableauTimeCode[index] = 'now';
                console.log("NOW");

                const embed = new Discord.MessageEmbed() // Embed pour les options facultative + NOW
                .setTitle("Quelques finitions :")
                .setDescription("Votre message est finit ! Utilisez les fonctions pour aller plus loin :\n\n**finish** pour sauvegarder.\n\n**preview** pour visualiser l'annonce.\n\n**date** pour modifier la date et l'heure de publication de l'annonce.\n\n**footer [texte]** pour ajouter un pied de page.\n\n**color [couleur]** pour personnaliser la couleur de l'annonce. Choix possibles : [rouge], [orange] et [vert] sinon utiliser une couleur hexadécimale.\n\n**image [URL de l'image]** pour ajouter une image en dessous de l'annonce.\n\n**thumbnail [URL de l'image]** pour ajouter une image en haut à droite.\n\n**url [URL]** pour ajouter un lien. Cela rendra le titre cliquable.\n\n**cancel** pour annuler l'annonce. Cette action est irréversible.")
                .setColor('#57ad44')
                message.channel.send(embed);
            } else {
            const embed = new Discord.MessageEmbed() // embed pour signaler l'erreur
                .setTitle("Erreur !")
                .setDescription("Un problème est survenue lors de la création du message programmé.\nVeuillez réessayer")
                .setColor("#ff0000")
                .setDescription("Veuillez respecter la forme suivante : (sans crochets)\n[jour] [mois] [heure] [minute]")
            message.channel.send(embed);
            }


        } else if(step = 4){
            console.log("Step : 4");
            let args = message.content.split(" ");
            console.log(args);

            switch (args[0]){

                case 'finish':
                    tableauMessageMemberId[index] = "finish";

                    if(tableauTimeCode[index] !== 'now'){ // TimeCode normal

                        tableauToken[index] = Math.random().toString().substring(2);

                        const embed = new Discord.MessageEmbed()
                            .setTitle("C'est fini !")
                            .setDescription("Et voilà, vous avez fini de configurer votre message !\nSachez que vous pouvezle modifier grâce au code suivant :** " + tableauToken[index] + "**.\n\nPour le modifier, il vous suffit d'utiliser la commande __**!msg edit [code unique]**__")
                            .setColor('#57ad44')
                        message.channel.send(embed);

                    } else { // Utilisation de Now : envoie du message
                        message.channel.send("```Envoie du message en cours...```");

                        const embed = new Discord.MessageEmbed()
                            .setTitle(tableauTitle[index])
                            .setDescription(tableauDescription[index])
                            .setImage(tableauImage[index])
                            .setThumbnail(tableauThumbnail[index])
                            .setColor(tableauColor[index])
                            .setURL(tableauUrl[index])
                            if(tableauFooter[index]){
                                embed.setFooter(tableauFooter[index] + "\n\nMade by Axel ROGET :\nhttps://instagram.com/axel_roget")
                            } else {
                                embed.setFooter("Made by Axel ROGET :\nhttps://instagram.com/axel_roget")
                            }
                        client.channels.cache.get(tableauChannel[index]).send(embed);
                        tableauTimeCode[index] = "avowed";

                    }
                    break;

                case 'footer':
                    console.log("Footer = " + message.content.substring(7));
                    tableauFooter[index] = message.content.substring(7);
                    message.reply("```Pied de page ajouté avec succès !```")
                    break;
                
                case 'color':
                    console.log("Color = " + args[1]);

                    if(args[1] === 'rouge'){ // couleur rouge
                        console.log("Couleur par défaut : rouge");
                        tableauColor[index] = '#ff0000';
                    } else if(args[1] === 'orange'){
                        console.log("Couleur par défaut : orange");
                        tableauColor[index] = '#fb6615';
                    } else if(args[1] === 'vert'){
                        console.log("Couleur par défaut : vert");
                        tableauColor[index] = '#57ad44';
                    } else {
                        console.log("Couleur custom");
                        tableauColor[index] = args[1];
                    }
                    message.reply("```Couleur ajouté avec succès !```");
                    break;

                case 'image':
                    tableauImage[index] = args[1];
                    message.reply("```Image ajouté avec succès !```");
                    break;
                
                case 'thumbnail':
                    tableauThumbnail[index] = args[1];
                    message.reply("```Image ajouté avec succès !```");
                    break;

                case 'url':
                    tableauUrl[index] = args[1];
                    message.reply("```URL ajouté avec succès !```");
                    break;

                case 'preview':
                    const embed2 = new Discord.MessageEmbed()
                        .setTitle(tableauTitle[index])
                        .setDescription(tableauDescription[index])
                        .setImage(tableauImage[index])
                        .setThumbnail(tableauThumbnail[index])
                        .setColor(tableauColor[index])
                        .setURL(tableauUrl[index])
                        if(tableauFooter[index]){
                            embed2.setFooter(tableauFooter[index] + "\n\nMade by Axel ROGET :\nhttps://instagram.com/axel_roget")
                        } else {
                            embed2.setFooter("Made by Axel ROGET :\nhttps://instagram.com/axel_roget")
                        }
                    message.channel.send(embed2)
                    break;

                case 'date':
                    const embed3 = new Discord.MessageEmbed()
                        .setTitle("Modification de la date :")
                        .setDescription("D'accord, modifions l'heure.")
                        .setFooter("Veuillez respecter la forme suivante : (sans crochets)\n[jour] [mois] [heure] [minute]\nChaque argument doit être en 2 chiffres.\nPar exemple : 5 heures >>> 05")
                        .setColor('#57ad44')
                    message.channel.send(embed3);
                    tableauStep[index] = 3;
                    break;

                case 'cancel':
                    tableauTimeCode[index] = 'Cancelled';
                    message.channel.send("```Message supprimé avec succès```");
                    break;

                default:
                    const embedError = new Discord.MessageEmbed()
                        .setTitle("Erreur avec le premier argument :")
                        .setDescription("**__" + args[0] + "__** n'est pas un argument valide.\nVoici les arguments valides :\n\n**finish** pour sauvegarder.\n\n**preview** pour visualiser l'annonce.\n\n**date** pour modifier la date et l'heure de publication de l'annonce.\n\n**footer [texte]** pour ajouter un pied de page.\n\n**color [couleur]** pour personnaliser la couleur de l'annonce. Choix possibles : [rouge], [orange] et [vert] sinon utiliser une couleur hexadécimale.\n\n**image [URL de l'image]** pour ajouter une image en dessous de l'annonce.\n\n**thumbnail [URL de l'image]** pour ajouter une image en haut à droite.\n\n**url [URL]** pour ajouter un lien. Cela rendra le titre cliquable.\n\n**cancel** pour annuler l'annonce. Cette action est irréversible.")
                        .setColor('#ff0000')
                    message.channel.send(embedError);
                
            }

        }


        

    }

    args = [];
    
});
client.login(process.env.TOKEN);
