# Pong

Hallo! Vandaag gaan we het spel *Pong* maken, op de computer.

Op de computer kan je zelf dingen maken door het in *code* te typen. Dat noemen we ook wel *programmeren*. Wij gaan het spel *Pong* programmeren.

Het is moeilijk om dat helemaal zelf te leren. Daarom hebben de begeleiders van de CoderDojo Enschede alvast een begin gemaakt. Hieronder vind je instructies waarmee je stap voor stap aan de slag kan.

Elke opdracht bevat uitleg, en dingen die jij zelf moet doen. De dingen die jij zelf moet doen, staan aangegeven met `▶▶▶`.

### Opdracht 0: Openen van programmeeromgeving

De code staat in *Trinket*. Dat is een website waarop je kan programmeren, en direct het resultaat kan bekijken.

▶▶▶ Open Trinket door op de link te klikken: // TODO

Je moet nu aan de linker kant code zien, en aan de rechter kant het Pong spel.

Als je aan de linker kant de code aanpast, dan verandert de website automatisch na een paar seconden aan de rechterkant.

Dat was gemakkelijk! Nu komt het echte werk!

// TODO ! [ ] (images/1.png)

### Opdracht 1: Muren tekenen

Op de website staat nog niet zoveel. We gaan eerst het speelveld tekenen van Pong.

Pong heeft twee muren. Als de bal een muur raakt, dan stuitert hij terug. We gaan de muren tekenen, zodat de bal er straks tegenaan kan stuiteren.

▶▶▶ Zoek *Opdracht 1* in het bestand `pong.js`.

Hier staan twee regels met `maakMuur(...)`. De *functie* `maakMuur` maakt een muur. We moeten invullen in de functie welke coordinaat de bovenkant van de muur moet hebben. De coordinaten beginnen bij `0`, en eindigen bij `speelVeld.hoogte`.

Maar de getallen zijn verkeerd! Bij beide muren staat `-100` in plaats van de onderkant of de bovenkant van het veld.

▶▶▶ Vul `0` in voor de bovenste muur in `maakMuur`.

Er moet nu een muur verschijnen aan de bovenkant van het speelveld

▶▶▶ Vul `speelveld.hoogte` in voor de onderste muur in `maakMuur`.

Dat is raar, er gebeurt niets. We zien geen tweede muur aan de onderkant van het speelveld.

Dat komt omdat we een foutje hebben gemaakt. De coordinaat die de we invullen is de bovenkant van de muur, en `speelveld.hoogte` is het einde van het speelveld. We moeten rekening houden met de hoogte van de muur.

▶▶▶ Vul `speelveld.hoogte - roosterGrootte` in voor de onderste muur in `maakMuur`.

Nu moet er wel een muur aan de onderkant van het speelveld verschijnen.

// TODO ! [ ] (images/2.png)

### Opdracht 2: Batjes tekenen

Als we Pong gaan spelen, dan hebben we batjes nodig. De bal kan tegen een batje stuiteren, zodat hij terugkaatst naar de tegenstander.

Laten we de batjes op het scherm tekenen.

▶▶▶ Zoek *Opdracht 2* in het bestand `pong.js`.

Er staan twee regels met `maakBatje`. Net als de muren is `maakBatje` een functie die een batje maakt.

Ook hier staan de coordinaten verkeerd, ze staan op `-100`. We moeten de afstand vanaf de linkerkant van het speelveld invullen waar de batjes getekend moeten worden.

Het linker batje moet getekend worden op 2 keer de grootte van het rooster.

▶▶▶ Vul voor het linker batje `2 * roosterGrootte` in in de functie `maakBatje`.

Het rechter batje moet getekend worden op 3 keer de grootte van het rooster van de rechterkant van het speelveld. De rechterkant van het speelveld is `speelveld.breedte`. Houdt rekening met de dikte van het batje.

▶▶▶ Vul voor het linker batje `speelveld.breedte - 3 * roosterGrootte` in in de functie `maakBatje`.

// TODO ! [ ] (images/3.png)

### Opdracht 3: Een bal

Tot nu toe gebeurt er nog niet zoveel. Pong is wel erg saai als er niets beweegt.

Laten we een bal tekenen in het veld. Onze bal is vierkant.

▶▶▶ Zoek *Opdracht 3* in het bestand `pong.js`.

▶▶▶ Tussen de twee markeringen van `Opdracht 3`, vul `tekenVierkant('white', balletje);` in. Vergeet de `;` aan het einde niet.

De functie `tekenVierkant` tekent een vierkant op op het scherm. De functie roepen we aan met twee argumenten: `'white'` (wit in het Engels), de kleur van het balletje en `balletje`, wat bepaalt waar en hoe groot de bal wordt getekend op het scherm.

Nu moet er een balletje verschijnen op het scherm.

// TODO ! [ ] (images/4.png)

### Opdracht 4: Stuiterbal

### Opdracht 5: Toetsenbord

### Opdracht 6: Wijzigen van toetsen

### Opdracht 7: Snelheid

### Opdracht 8: Richting van de bal

### Opdracht 9: Willekeurig begin

### Opdracht 10: Kleuren

### Opdracht 11: Ronde bal

### Opdracht 12: Score

### Opdracht 13: Bal willekeurig laten stuiteren
