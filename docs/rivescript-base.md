# Les bases de RiveScript


## C'est quoi RiveScript ?

RiveScript est un **langage de programmation** qui sert à programmer des **chatbots**.


## Le RiveScript Playground

Pour commencer à utiliser RiveScript, une bonne solution est d'aller sur l'*aire de jeu RiveScript* (*RiveScript Playground*) : le lien est sur le pad.

Une fois sur cette page, supprimez tout le contenu de la zone jaune.

Pour la suite on écrira notre code dans la partie de gauche (jaune), et on appuiera sur `Run` pour le tester dans la partie droite.


## Premiers pas

Écrivons notre premier code RiveScript !

```
+ salut robot
- Salut humain !
```

Écrivez ce code dans la partie jaune du *RiveScript Playground*, appuyez sur `Run`.

Maintenant écrivez "Salut robot." et appuyez sur `Send`. Le robot vous répond !

![](img/cde1.png)

### Explication du code

Dans un code RiveScript, chaque ligne est une commande. Pour savoir de quelle type de commande il s'agît il suffit de regarder le symbole en début de ligne (dans cet exemple on voit les symboles `+` et `-`).

#### Commande de déclencheur `+`

La commande `+` sert à définir un **déclencheur**. Un déclencheur est une ligne de texte qui sert à reconnaître le message de l'utilisateur.

#### Commande de réponse `-`

La commande `-` sert à définir les réponses au déclencheur.

### Important !

**Un déclencheur doit toujours être écrit en minuscule et sans ponctuation !**

Les apostrophes `'` et les tirets `-` ne posent pas de problèmes, mais si vous mettez une majuscule ou un point dans un déclencheur, cela va créer une erreur qui vous empêchera de tester le code. 
Par contre on peut mettre des majuscules et des signes de ponctuation dans les commandes de réponse.
Par exemple, le code suivant contient des erreurs :

```
+ Et toi, comment tu vas ?
- Oui je vais super bien !
- Bof...
- Bien et toi ?
```

On corrige les erreurs en remplaçant dans la ligne du déclencheur les majuscules par des minuscules, et en supprimant les signes de ponctuation. Le code suivant est le code corrigé, il ne contient plus d'erreurs:

```
+ et toi comment tu vas
- Oui je vais super bien !
- Bof...
- Bien et toi ?
```

### Plusieurs réponse pour un même déclencheur

Un même déclencheur peut avoir plusieurs réponses possible, il suffit de mettre plusieurs *commandes de réponse*.

Par exemple :

```
+ ça va
- Oui je vais super bien !
- Bof...
- Bien et toi ?
```

Quand on lui demandera "Ça va ?", le robot choisira une réponse au hasard parmis les trois possibles.

### La suite...

RiveScript est un language puissant qui permet de faire beaucoup plus de choses que ce qu'on a vu là. Essayez déjà d'exploiter un maximum ce que vous avez appris ici, puis passez à la suite : [Utilisation avancée de RiveScript](rivescript-avance.html)
