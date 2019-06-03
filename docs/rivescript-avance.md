# Utilisation avancée de RiveScript

## Des déclencheurs plus puissants (Les Jokers)

Pour l'instant on n'a vu que des déclencheurs qui ne marchaient que quand l'utilisataur écrivait exactement le même message.

Mais pour pouvoir être capable de répondre à un maximum de messages, il va falloir trouver un moyen d'écrire des déclencheurs plus souples.

C'est là qu'interviennent les Jokers.

### L'étoile `*`

Essayons ce bout de code :

```
+ je m'appelle *
- Oh ! C'est un très joli prénom !
```

Si je teste ce code je verrai que le robot répondra "Oh ! C'est un très joli prénom !" quelque soit mon prénom. Que j'écrive "Je m'appelle Sofiane", "Je m'appelle Lola" ou encore "Je m'appelle voiture de course"

En fait, le symbole `*` veut dire "n'importe quelle suite de lettres"

#### Autres exemples d'utilisation de `*`

```
+ * est très beau
- Je ne le trouve pas si beau que ça.
```

```
+ j'ai * ans
- Moi je suis beaucoup plus jeune que ça !
```

```
+ * rouge *
- Le rouge c'est ma couleur préféré !
```

#### Le déclencheur *fourre-tout*

Jusqu'à maintenant, quand on disait au robot une phrase à laquelle il ne savait pas répondre, il y avait une erreur (`ERR: No Reply Matched`).

L'étoile peut nous permette de créer un déclencheur qui se déclenche à chaque fois que le robot n'a rien à dire :

```
+ *
- Je ne sais pas trop quoi dire...
- Parlons d'autre chose !
```

#### Récupérer le contenu de l'étoile

Nous avons vu que l'étoile voulait dire "n'importe quelle suite de lettres". On peut récupérer la suite de lettres qui a déclenché une étoile et s'en servir dans la réponse. Par exemple:

```
+ je m'appelle *
- Tu es la première personne que je rencontre qui s'appelle <star>
```

Ça donnera la discussion :

"Je m'appelle Kévin"

"Tu es la première personne que je rencontre qui s'appelle Kévin"

Si il y a eu plusieurs étoiles dans le déclencheur, on peut les rappeler ainsi <star1>, <star2>, <star3>, etc
A noter que <star> récupère aussi les mots alternatifs entre parenthèse. (voir ci-dessous)

### Mots optionnels et alternatifs

Les mots optionnels et les mots alternatifs ont un but simple: ils permettent de reconnaître différentes phrases qui se ressemblent avec un seul déclencheur. C'est très pratique, parce que souvent il y a plusieurs manières de demander une même chose.


#### Mots alternatifs

Des fois on aimerait que le déclencheur se déclenche si l'utilisateur dis un mot ou un autre, jusque là il nous fallait différents déclencheurs:
```
+ tu joues au foot
- Non, j'ai peur des ballons.

+ tu joues au volley
- Non, j'ai peur des ballons.

+ tu joues au basket
- Non, j'ai peur des ballons.
```
Les mots alternatifs permettent de faire la même chose avec un seul déclencheur et une seule réponse:

```
+ tu joues au (foot|volley|basket)
- Non, j'ai peur des ballons.
```
Dans un déclencheur, les mots alternatifs sont notés entre parenthèses et séparés par des barres `|` (sur le clavier, pour tapper `|`, il faut appuyer sur la touche ALT et sur la touche 6 en même temps).
Le déclencheur se déclenchera que l'on dise "Tu joues au volley ?" ou "Tu joues au volley ?".

A noter : On peut récupérer le contenu des parenthèses avec `<star>`
 
``` 
+ tu joues au (foot|volley|basket)
- Non je ne peux pas jouer au <star> , j'ai peur des ballons.
```
#### Mots optionnels

Les mots optionnels se notent comme les mots alternatifs, mais avec des crochets à la place des parenthèses. Ils fonctionnent presque comme les mots alternatifs sauf que le déclencheur se déclenchera quant même si il n'ya rien à la place des mots optionnels. Reprenons l'exemple précédent, et rajoutons des mots optionnels:

```
+ tu joues au (foot|volley|basket) [régulièrement|en club|le week end]
- Non, j'ai peur des ballons.
```

 Dans cet exemple, le robot répondra "Non, j'ai peur des ballons." si l'utilisateur pose la question "Tu joues au foot régulièrement ?" et il répondra la même chose si on lui demande juste "Tu joues au foot ?". Par contre si on demande juste "Tu joue au ?" alors le déclencheur ne se déclenchera pas car il ne se déclenche que si "foot", "basket" ou "volley" suivent le mot "joue".

#### L'étoile optionnelle

Il peut être utile d'utiliser l'étoile optionelle `[*]`. On a vu que `*` veut dire "n'importe quelle suite de lettres", et bien `[*]` veut dire "n'importe quelle suite de lettres ou bien rien du tout". Voyons un exemple:

```
+ tu veux manger [*]
- Oui j'ai vraiment très faim.
```
Ici si l'utilisateur demande "Tu veux manger du boudin ?", le robot répondra "Oui, j'ai vraiment très faim", mais si l'utilisateur demande juste "Tu veux manger", le robot répondra aussi.


## Choix des réponses lorsque plusieurs déclencheurs se déclenchent

Il se peut que plusieurs déclencheurs se déclenchent en même temps lorsqu'un utilisateur rentre une phrase. Dans ce cas c'est le déclencheur qui a reconnu le plus de mots qui donnera une réponse.

```
+ bonjour [*]
- Bonjour humain.

+ [*] tu vas bien
- Je vais bien, et toi ?
```
Avec ce code, si l'utilisateur demande "Bonjour, tu vas bien ?", les deux déclencheurs vont se déclencher, mais le robot va répondre "Je vais bien, et toi ?", car il a reconnu plus de mots dans "tu vas bien" que dans "bonjour". 

On peut régler un déclencheur pour qu'il se déclenche en priorité. Il faut augmenter son "poids", qui est de 1 par défaut.
La réponse que donne le robot est celle du déclencheur qui a le plus grand poids. Si il y a égalité, on applique la règle du nombre de mots reconnus. 

On peut modifier l'exemple précédent pour que le robot réponde "Bonjour humain." lorsque l'utilisateur lui demande "Bonjour, tu vas bien ?":

```
// Le poids du déclencheur est de 10
+ bonjour [*]{weight=10}
- Bonjour humain.

// Le poids du déclencheur est de 1 si on ne précise rien
+ [*] tu vas bien
- Je vais bien, et toi ?
```

## Tableaux

Pour définir un tableau :
```
! array verbesport = courir|sauter|jouer au ballon|nager|voler|faire de la muscu
```
On peut se servir du tableau dans un déclencheur pour déclencher sur n'importe quel mot du tableau. 
On peut récupérer avec <star> le mot détecté.

```
+ tu aimes (@verbesport)
- Non, je suis fatigué et j'ai la flemme de <star>.
```
On peut se servir du tableau dans une réponse pour choisir au hasard un mot du tableau.
```
+ tu fais du sport
- De temps en temps j'aime bien (@verbesport) pour rester en forme.
```

Bien sur, pas de ponctuation ni d'accent ni majuscule dans les noms des array, ni dans la liste, on ne garde que les apostrophes et les tirets, comme dans les déclencheurs.

## Redirection

Un déclencheur peut rediriger vers un autre déclencheur avec la commande `@`

ex :

```
+ bonjour
- salut humain

+ salut
@ bonjour

```

Bien sur, pas de ponctuation ni d'accent ni majuscule dans les redirections, on ne garde que les apostrophes et les tirets, comme dans les déclencheurs.

## Conversations courtes

Pour créer un fil de discussion, on peut utiliser une ligne de commande qui commence par  `%` (précédant).
Cela rajoute au déclencheur la condition qu'une phrase particulière ai été prononcée par le Bot dans l'échange précédant. 
C'est très utile pour créer des petites conversations qui donnent l'illusion que le Bot comprend ce dont on parle.

ex :

```
+ *
- j'ai un petit creux. Et toi tu as faim ?

+ oui
% j'ai un petit creux et toi tu as faim
- Génial, on va se faire un pizza !

+ non
% j'ai un petit creux et toi tu as faim
- Dommage...

```

Bien sur, pas de ponctuation ni d'accent ni majuscule dans les précédants, on ne garde que les apostrophes et les tirets, comme dans les déclencheurs.


## Donner une mémoire au Bot

on peut enregistrer des variables (age, nom, etc...) qui seront mémorisées par le bot au cours de la conversation.
On utilise pour cela les commandes `<set>` pour enregistrer `<get>` pour rappeler. Il faut donner un nom à la variable à enregistrer : nom, age, etc...

```

+ mon nom est *
- <set nom=<star>> Heureux de te rencontrer <star>

+ comment je m'appelle
- Tu t'appelles <get nom>.

```

## Pour aller plus loin.

Pour aller plus loin dans les fonctionnalités de rivesript vous pouvez consulter la documentation originale en anglais à cette adresse :
https://www.rivescript.com/docs/tutorial

