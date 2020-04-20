PROJET (avril 2020) : Timed Annoucement est un bot discord permettant aux utilisateurs bénéficiants du rôle "gérer les messages" de créer des annonces personnalisées sous forme d'embed est à une date et une heure personnalisable. Pour ce faire : l'utilisateur doit utiliser la commande "!msg add #[channel]" en remplacant channel par le nom du salon dans lequel le message sera envoyé. Le bot envera ensuite un message privé à l'auteur du message pour lui demander de titrer l'annonce, de donner une description et de définir une date et une heure d'envoie du message. Enfin, l'utilisateur à le choix d'ajouter ou non un lien, deux images, un pied de page, une couleur. Il peut aussi prévisualiser le message ou le supprimer.

Vous pouvez ajouter le bot à votre serveur grâce au lien suivant : https://discordapp.com/api/oauth2/authorize?client_id=692836953183486013&permissions=10240&scope=bot

-----------------------------------------------------

PROCHAINES FONCTIONALITES :
- Ajout du \n pour pouvoir passer à la ligne dans la description et les autres zones de textes (hormis le titre).
- Ajout d'un message lorsque le bot arrive sur un serveur.
- Ajout d'un message d'annonce pour énoncer les nouvelles fonctionnalités à chaque patch note.
- Ajout d'un grade "serveur prioritaire" pour retirer l'auteur et la publicité sur les annonces.

-----------------------------------------------------

PATCH NOTE 1.3 (07/04/2020): 
- Ajout de l'argument now à la place de l'heure et la date pour publier le message dès l'utilisation de finish.

---------------------------------------------------

PATCH NOTE 1.2 :
- Ajout de la possibilité de modifier un message personnalisé, ainsi que de modifier la date et l'heure de sa publication grâce à la commande !msg edit [code]
- Correction de bugs de crash lorsque des mauvais arguments sont entrés.

BUG CONNUS :
- Message d'erreur lors de l'utilisation de la commande !msg edit [code] en message privé avec le bot. Pas de problèmes, vous pouvez utiliser cette commande aussi bien en mp avec le bot que dans un salon sur un serveur. Le bot affiche un message d'erreur mais n'en tenez pas compte, il n'y a pas de rééls erreurs.

PROCHAINES FONCTIONALITES :
- Ajout de l'argument "now" lors de la configuration de la date et de l'heure pour publier le message dès l'utilisation de "finish".
- Ajout du \n pour pouvoir passer à la ligne dans la description et les autres zones de textes (hormis le titre).
