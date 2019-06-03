## Ateliers chatbot

Ce dépot contient un modèle pour organiser le travail et le rendu des ateliers chatbots.

Il contient deux dossiers :

- `bots/` : [les bots créés en ateliers](bots)
- `docs/` : [la documentation](docs) pour pendant le déroulement de l'atelier
- `www/` : [le modèle pour créer un nouveau bot](www)

### Usage

#### Mettre un chatbot à jour

- Les codes rivescript doivent être mis dans des fichiers 'rive' (ex: `fichier.rive`)
- Mettre tous les fichiers `.rive` dans le dossier `bots/nom-de-l-atelier/brain/`
- Lister ces fichiers dans `bots/nom-de-l-atelier/riveList.js` :
    ```
    const riveList = [
        'brain/fichier1.rive',
        'brain/fichier2.rive',
        'brain/fichier3.rive'
    ];
    ```
- **Bonus :** Compléter `index.html` et `about.html` avec les bonnes informations. (Nom du bot, etc.)


#### Lancer un nouvel atelier
- Copier le dossier `www/` dans `bots/` et rennomez le avec l'identifiant de l'atelier.
- Ajouter un lien vers ce dossier dans `bots/README.md`
- Ouvrir un nouveau Pad et le mettre en lien dans `brain/special.rive`


### Ressources

- Aire de jeu : https://play.rivescript.com/
- Doc officielle : https://www.rivescript.com/
- Pad : https://etherpad.wikimedia.org/
- Doc Nokill : https://github.com/LeonLenclos/ateliers-chatbot
