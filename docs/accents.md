## Règles concernant les accents et la ponctuation

Rivescript est un langage initialement conçu pour créer des chatbots en anglais. Du coup il n'était pas initialement prévu pour supporter les lettres accentués (`é` ou `à` par exemple). Depuis il a été adapté pour fonctionner avec des accents, mais il reste encore quelques erreurs qui n'ont pas été corrigés. Pour éviter les éventuelles erreurs, il faut suivre les recommandations de cette page.

Tout d'abord, dans l'[aire de jeux rivescript](http://play.rivescript.com), il faut absolument cocher la case *UTF-8 Mode*.

Les accents, les majuscules et la ponctuation (sauf les apostrophes `'` et les tirets `-` qui sont tolérés) ne doivent pas apparaître dans les contextes suivants:

- Dans les déclencheurs qui commencent par `+`
- Dans les précédents qui commencent par `%`
- Dans les renvois de question qui commencent par `@`

En fait on ne s'autorise les accents, les majuscules et la ponctuation (sauf les apostrophes `'` et les tirets `-`) que dans les réponses qui commencent par `-`. 

Seulement parfois on copie\colle une réponse car on veut s'en servir de précédent. Il faut alors supprimer la ponctuation et remplacer les lettres accentués par une étoile `*`. Voici un exemple:

```
+ tu es qui 
- Je suis un élève, et toi tu étudies?

+ oui
% je suis un *l*ve et toi tu *tudies
- Du coup t'es dans quel établissement ?
```

### Attention !

**Les règles de l'[aire de jeux rivescript](http://play.rivescript.com) ne sont pas les mêmes que celles de notre bot !**

Des choses qui ne marchent pas sur l'aire de jeux peuvent marcher sur le bot de l'atelier. Si on applique les règles ci-dessus, cela marchera forcément dans notre bot, mais pas toujours dans le playground. En fait sur notre bot dans les phrases tapés par l'utilisateur les caractères accentués sont remplacés par leur équivalent non-accentué (é est remplacé par e). Pour tester correctement le bot dans l'aire de jeux, il est conseillé de taper les lettres non-accentués au clavier.
