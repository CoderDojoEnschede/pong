//https://gist.github.com/straker/81b59eecf70da93af396f963596dfdc5
const canvas = document.getElementById('spel');
const context = canvas.getContext('2d');

// Deze variabele wordt overal gebruikt om te zorgen dat dezelfde maat gebruikt wordt.
// Voor de dikte van de muur, de grootte van het balletje en de hoogte van de batjes en de extra ruimte her en der.
const roosterGrootte = 15;

// We stellen de maat van het canvas in aan de hand van de roostergrootte
canvas.width = 57 * roosterGrootte;
canvas.height = 35 * roosterGrootte;
const speelveld = {
    x: 0,
    y: 0,
    breedte: canvas.width,
    hoogte: canvas.height,
};

const hoogteVanBatje = roosterGrootte * 5;
const maximaleVerticalePositieVanBatje = speelveld.hoogte - roosterGrootte - hoogteVanBatje;

const snelheidVanBatje = 12;

// --- Opdracht 7 --- //

const snelheidVanBalletje = 3;

// --- Opdracht 7 --- //


function maakBatje(horizontalePositie) {
    return {
        x: horizontalePositie,
        y: speelveld.hoogte / 2 - hoogteVanBatje / 2, // in het verticale midden
        breedte: roosterGrootte,
        hoogte: hoogteVanBatje,
        // snelheid van batje
        dy: 0,

        beweegOmhoog: function() { this.dy = -snelheidVanBatje },
        beweegOmlaag: function() { this.dy = snelheidVanBatje },
        stop: function() { this.dy = 0 },
    };
}

function maakMuur(verticalePositie) {
    return {
        x: 0, // links
        y: verticalePositie, // verticalePositie
        breedte: speelveld.breedte, // hele breedte van het speelveld
        hoogte: roosterGrootte, // hoogte van het rooster
    };
}
// --- Opdracht 1 --- //

const muurBovenkant = maakMuur(0); // Helemaal bovenaan
const muurOnderkant = maakMuur(speelveld.hoogte - roosterGrootte); // Onderkant van het speelveld min de roosterGrootte.

// --- Opdracht 1 --- //


// --- Opdracht 2 --- //

const linkerBatje = maakBatje(roosterGrootte * 2); // 2x de roostergrootte vanaf de Linkerkant (2x losse ruimte aan de linkerkant)
const rechterBatje = maakBatje(speelveld.breedte - 3 * roosterGrootte); // 3x de roostergrootte vanaf de Rechterkant (2x losse ruimte + 1x de breedte van het batje)

// --- Opdracht 2 --- //


const balletje = {
    // start in het midden van het spel
    x: speelveld.breedte / 2,
    y: speelveld.hoogte / 2,
    breedte: roosterGrootte,
    hoogte: roosterGrootte,

    // Nodig om bij te houden wanneer het balletje opnieuw in het midden moet beginnen
    resetting: false,


    // --- Opdracht 8 --- //

    // Snelheid van balletje, begin altijd met naar de rechter boven hoek te bewegen
    dx: snelheidVanBalletje,
    dy: -snelheidVanBalletje,

    // --- Opdracht 8 --- //

    keerOm: function () { this.dy *= -1; },
};


// Controleer of 2 objecten elkaar raken met behulp van op de as uitgelijnde begrenzingsvakken (AABB)
// @zie https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection voor meer informatie (Engels)
// Misschien kunnen we deze functie nog verder uitschrijven om uit te leggen hoe dit precies werkt?
function botsenDeObjecten(obj1, obj2) {
    return obj1.x < obj2.x + obj2.breedte &&
        obj1.x + obj1.breedte > obj2.x &&
        obj1.y < obj2.y + obj2.hoogte &&
        obj1.y + obj1.hoogte > obj2.y;
}

function maakSpeelveldSchoon() {
    context.clearRect(0, 0, speelveld.breedte, speelveld.hoogte);
}

function verwerkBatje(batje) {
    // Verplaats het batje met de verticale snelheid
    batje.y += batje.dy;

    // Zorg ervoor dat het batje niet uit het speelveld kan verdwijnen
    if (batje.y < roosterGrootte) {
        batje.y = roosterGrootte;
    } else if (batje.y > maximaleVerticalePositieVanBatje) {
        batje.y = maximaleVerticalePositieVanBatje;
    }
}

function verwerkBalletje() {
    // Verplaats het balletje met behulp van de horizontale en verticale snelheid
    balletje.x += balletje.dx;
    balletje.y += balletje.dy;

    // Zorg ervoor dat het balletje niet buiten het speelveld kan komen, maar de andere kant op stuitert.
    if (balletje.y < roosterGrootte) {
        balletje.y = roosterGrootte;

        // --- Opdracht 4 (a) --- //

        balletje.keerOm();

        // --- Opdracht 4 (a) --- //

    } else if (balletje.y + roosterGrootte > speelveld.hoogte - roosterGrootte) {
        balletje.y = speelveld.hoogte - roosterGrootte * 2;

        // --- Opdracht 4 (b) --- //

        balletje.keerOm();

        // --- Opdracht 4 (b) --- //
    }

    // Zorg ervoor dat de bal opnieuw begint op de start positie zodra deze voorbij een batje komt(Maar alleen als we dat nog niet gedaan hebben).
    if ((balletje.x < 0 || balletje.x > speelveld.breedte) && !balletje.resetting) {
        balletje.resetting = true;

        // We geven de spelers een halve seconde pauze voordat het balletje opnieuw begint.
        setTimeout(() => {
            balletje.resetting = false;
            balletje.x = speelveld.breedte / 2;
            balletje.y = speelveld.hoogte / 2;
        }, 500);
    }
}

function tekenRooster(kleur, lijnDikte) {
    context.fillStyle = 'lightblue';
    context.strokeStyle = kleur;
    context.lineWidth = lijnDikte;

    // Horizontale lijnen
    for (let y = 0; y * roosterGrootte <= speelveld.hoogte; y++) {
        context.beginPath();
        context.moveTo(0, y * roosterGrootte);
        context.lineTo(speelveld.breedte, y * roosterGrootte);
        context.stroke();
    }

    // Verticale lijnen
    for (let x = 0; x * roosterGrootte <= speelveld.breedte; x++) {
        context.beginPath();
        context.moveTo(x * roosterGrootte, 0);
        context.lineTo(x * roosterGrootte, speelveld.hoogte);
        context.stroke();
    }
}

function tekenVierkant(kleur, vierkant) {
    context.fillStyle = kleur;
    context.fillRect(vierkant.x, vierkant.y, vierkant.breedte, vierkant.hoogte);
}

// Spel lus
function loop() {
    // Dit zorgt ervoor dat deze functie elk keer opnieuw aangeroepen wordt.
    requestAnimationFrame(loop);

    maakSpeelveldSchoon();

    verwerkBatje(linkerBatje);
    verwerkBatje(rechterBatje);
    verwerkBalletje();

    // Kijk of het balletje botst met het linker batje. Als dat zo is, zorg ervoor dat het balletje de andere kant opt gaat
    if (botsenDeObjecten(balletje, linkerBatje)) {
        balletje.dx *= -1;
        // En zorg ervoor dat we het balletje van het batje af laten ketsen, zodat we niet nog een keer denken dat ze botsen.
        balletje.x = linkerBatje.x + linkerBatje.breedte;
    } else if (botsenDeObjecten(balletje, rechterBatje)) {
        balletje.dx *= -1;
        // En zorg ervoor dat we het balletje van het batje af laten ketsen, zodat we niet nog een keer denken dat ze botsen.
        balletje.x = rechterBatje.x - balletje.breedte;
    }

    tekenRooster('grey', 1);

    tekenVierkant('white', linkerBatje);
    tekenVierkant('white', rechterBatje);


    // --- Opdracht 3 --- //

    tekenVierkant('white', balletje);

    // --- Opdracht 3 --- //


    tekenVierkant('lightgrey', muurBovenkant);
    tekenVierkant('lightgrey', muurOnderkant);

    // Teken de lijn door het midden van het speelveld.
    for (let verticalePositie = roosterGrootte; verticalePositie < speelveld.hoogte - roosterGrootte; verticalePositie += roosterGrootte * 2) {
        tekenVierkant('lightgrey', {
            x: speelveld.breedte / 2 - roosterGrootte / 2,
            y: verticalePositie,
            breedte: roosterGrootte,
            hoogte: roosterGrootte
        });
    }
}

// Luister naar toets aanslagen om de batjes naar boven of beneden te bewegen
function luisterToetsIndrukken(e) {

    if (e.key === 'ArrowUp' || e.key === 'Up') {
        // Pijltje naar boven zorgt ervoor dat het rechter batje omhoog gaat

        // --- Opdracht 5 (a) --- //

        rechterBatje.beweegOmhoog();

        // --- Opdracht 5 (a) --- //

    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        // Pijltje naar onder zorgt ervoor dat het rechter batje omlaag gaat

        // --- Opdracht 5 (b) --- //

        rechterBatje.beweegOmlaag();

        // --- Opdracht 5 (b) --- //

    }

    // --- Opdracht 6 (a) --- //
    if (e.key === 'w') {
        // De 'w' toets zorgt ervoor dat het linker batje omhoog gaat
        // --- Opdracht 6 (a) --- //

        // --- Opdracht 5 (c) --- //

        linkerBatje.beweegOmhoog();

        // --- Opdracht 5 (c) --- //

    // --- Opdracht 6 (b) --- //
    } else if (e.key === 's') {
        // De 's' toets zorgt ervoor dat het linker batje omlaag gaat
        // --- Opdracht 6 (b) --- //

        // --- Opdracht 5 (d) --- //

        linkerBatje.beweegOmlaag();

        // --- Opdracht 5 (d) --- //

    }
}

// Luister naar het loslaten van toetsen om te zorgen dat het batje stopt met bewegen
function luisterToetsLoslaten(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Up' || e.key === 'Down') {

        // --- Opdracht 5 (e) --- //
        rechterBatje.stop();
        // --- Opdracht 5 (e) --- //

    }

    // --- Opdracht 6 (c) --- //
    if (e.key === 'w' || e.key === 's') {
    // --- Opdracht 6 (c) --- //

        // --- Opdracht 5 (f) --- //

        linkerBatje.stop();

        // --- Opdracht 5 (f) --- //

    }
}

document.addEventListener('keydown', luisterToetsIndrukken);
document.addEventListener('keyup', luisterToetsLoslaten);

// start het spel
requestAnimationFrame(loop);
