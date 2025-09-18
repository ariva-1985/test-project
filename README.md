# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


## 
- ho usato Expo come framework di partenza in quanto gestisce in automatico sia la parte nativa che la parte web con l'expo router
- folder app/ contiene le rotte di navigazione 
- in app/_layout.tsx (root layout) ho wrappato gli screen con un componente ScreenLayout che gestisce in maniera semplice ma centralizzata le differenze di layout per web e nativo e gli inset di piattaforma. 
- le animazioni di transizione del router sono configurabili nelle options dello screen, ho mantenuto quelle di default
- in service/api ho definito un client api singleton, l'idea è renderlo modulare con un modulo per ogni feature 
- components/ (livello di root) contiene componenti generici usabili in tutto il progetto
- features/ contiene il codice specifico di ogni feature
- per la gestione dello stato ho usato tanstack/react-query. è la prima volta che la uso ma sembrava adatta a soddisfare i requisiti 
- per le api utilizzate viene creato un hook che wrappa useQuery di tanstack, la queryFunction utilizza i metodi esposti dall'api client
- hook useArticleById.tsx > per l'endpoint delle informazioni di dettaglio articolo, viene gestito tramite configurazione il numero di retry, stale time del risultato dell'api, e periodo in cui viene tenuta in memoria il risultato dell'api 
- la mia esperienza con la libreria è limitata e sicuramente si può fare una configurazione più dettagliata, ma questa impostazione di base è funzionale e permette di evitare che le api vengano invocate inutilmente
- ArticlesList.tsx > viene invocata l'api per caricare le top news, l'array di id viene usato come data per una flatlist 
- in caso di errore sulla chiamata viene mostrato un messaggio di errore e un bottone per ricaricare i dati
- la flatlist è configurata per caricare un numero di  elementi limitato con windowSize={2} , in modo da avere disponibile dati per il viewport corrente e il successivo. con questa configurazione vengono caricati le info per i primi 10 articoli
- man mano che si scrolla vengono montati i successivi elementi della lista che sono responsabili del caricamento dell'info di dettaglio. scrollando gli elementi vengono montati/smontati all'occorrenza ma il dato non viene ricaricato a meno che non sia considerato stale
- il componente ListItem definito in ArticlesList.tsx gestisce il caricamento delle info, mostra un loading durante la request pending, 
- nel caso in cui la chiamata vada in errore non renderizza nulla, al refresh della lista eventualmente il dato viene ricaricato (non è in cache)
- quando il dato è pronto, viene renderizzato in lista con ArticleListItemDetails, il container è una animated view con FadeIn al mount. premendo 'Details' si naviga alla pagina di dettaglio
- come param di navigazione viene passato l'id dell'articolo 
- ArticleDetails.tsx riceve l'id dal componente padre screen, e tramite l'hook useArticleById recupera il dato (se stale, viene rifatta la chiamata, e si aggiorna in automatico anche l'elemento della lista)
- anche in ArticleDetails.tsx il container è una animated view con FadeIn al mount, renderizza le info di dettaglio e permette di accedere all'url dal bottone a fondo screen o interagendo con l'url, aprendo la pagina originale esternamente all'app
- i test sono stati effettuati su simulatore ios, device android (pixel 4a) e browser in modalità di debug, senza riscontrare problemi di performance (58+fps consistenti su nativo)



## note e limitazioni
- manca una gestione centralizzata di temi/colori/size dei font
- ho provato a parametrizzare le rotte con delle costanti (config/routes) ma quando uso il router mi da errori (a quanto ho capito è una limitazione di expo router)
- l'header web non è a tutta pagina con viewport width > 768. ho provato a modificare le configurazioni di routing dei file di layout ma non sono riuscito a trovare una configurazione funzionante
- manca gestione signal/abortController su chiamate api per cancellare richieste in flight all'unmount dei componenti
- si può considerare il passaggio a flashlist, più performante, ma ho preferito usare la flatlist per non aggiungere ulteriori dipendenze
- testando su sim ios, aumentando il fontsize con le opzioni di accessibilità ho riscontrato problemi di rendering degli elementi in flatlist mantenendo attiva l'ottimizzazione di getItemLayout.
  per ora ho commentato getItemLayout e modificato il container di ListItem per avere una minHeight costante (per avere elementi della lista coerenti tra loro in condizioni naturali), ma andrebbe valutata una soluzione piu fine
- warning su web "props.pointerEvents is deprecated. Use style.pointerEvents" dovuto a expo-router
- warning su web Blocked aria-hidden on an element because its descendant retained focus. The focus must not be hidden from assistive technology users. Avoid using aria-hidden on a focused element or its ancestor. Consider using the inert attribute instead, which will also prevent focus. For more details, see the aria-hidden section of the WAI-ARIA specification da indagare, credo si anche lui dovuto al router
- per lo sviluppo del test sono stati utilizzate tecnologie nuove o con cui non ho la massima familiarità (expo, tanstack, typescript) per cui il tempo di sviluppo è stato superiore alle 2-3h stimate, motivo per cui non ho integrato anche i test unitari (onestamente non ho esperienza con react-testing-library)
- una precisazione visti gli orari dei commit, il test non è stato effettuato nell'orario di lavoro, sono in ferie questa settimana
