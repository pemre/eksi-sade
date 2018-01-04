'use strict';

/**************** HELPER FUNCTIONS ****************/

/**
 * Removes given nodes
 *
 * @param nodes
 */
function removeNodes(nodes) {
    Array.prototype.forEach.call(nodes, function (node) {
        node.parentNode.removeChild(node);
    });
}

/**
 * Returns all next siblings of an element
 *
 * @param elem
 * @param filter
 * @returns {Array}
 */
function getNextSiblings(elem, filter) {
    var sibs = [];
    while (elem = elem.nextSibling) {
        if (elem.nodeType === 3) continue; // text node
        if (!filter || filter(elem)) sibs.push(elem);
    }
    return sibs;
}

/**
 * Returns visibility status of the element, source: jQuery
 *
 * @param elem
 * @returns {boolean}
 */
function isHidden(elem) {
    return (elem.offsetWidth === 0 && elem.offsetHeight === 0) ||
        (elem.style && elem.style.display) === 'none';
}

/**
 * Converts the ranks like '2,2b' into '2200'
 *
 * @param elem
 */
function convertThousands(elem) {
    var t = elem.innerHTML;
    if (t.substr(-1) === 'b') {
        t = t.substring(0, t.length - 1);
        if (t.indexOf(',') >= 0)
            t = t.replace(',', '') + '00';
        else
            t += '000';
        elem.innerHTML = t;
    }
}

/**
 * Colourises the links based on comment count
 *
 * @param elem
 */
function convertColors(elem) {
    var rank = Number(elem.children[0].innerHTML);
    if (rank > 1000) elem.style.color = '#ff0000';
    else if (rank > 500) elem.style.color = '#ff8000';
    else if (rank > 300) elem.style.color = '#ffbf00';
    else if (rank > 200) elem.style.color = '#ffff00';
    else if (rank > 100) elem.style.color = '#bfff00';
    else if (rank > 80) elem.style.color = '#55ff00';
    else if (rank > 60) elem.style.color = '#00ff55';
    else if (rank > 40) elem.style.color = '#00ffbf';
    else if (rank > 20) elem.style.color = '#00bfff';
    else if (rank > 10) elem.style.color = '#0088bb';
    else if (rank > 0) elem.style.color = '#5599aa';
}

/**************** MAIN FUNCTIONS ****************/

/**
 * Sorts and colourises side menu links
 */
function improveLinks() {
    // On mobile, parent of the list changes and the default parent becomes hidden
    var root;
    if (!isHidden(document.getElementById('index-section')))
        root = '#index-section '; // default parent
    else
        root = '#mobile-index ';  // mobile parent
    // Select all topics, define an array for sorting, select the topics container
    var topics = document.querySelectorAll(root + '.topic-list li'),
        topicsArr = [],
        topicsContainer = document.querySelectorAll(root + '.topic-list')[0];
    // Improve the topics one by one
    Array.prototype.forEach.call(topics, function (t) {
        var link = t.children[0],
            rank = link.children[0];
        // Rank can be like '2,2b', convert it into numbers
        convertThousands(rank);
        // Colourise the links based on comment count
        convertColors(link);
        // Push it to the array for sorting
        topicsArr.push(t);
        // Remove the topic from container
        t.parentNode.removeChild(t);
    });
    // Sort function callback
    var sortLi = function (a, b) {
        var na = Number(a.children[0].children[0].innerHTML);
        var nb = Number(b.children[0].children[0].innerHTML);
        return nb > na ? 1 : -1;
    };
    // Sort the topics
    topicsArr.sort(sortLi);
    // Append topics back to the container
    for (var i = 0; i < topicsArr.length; ++i)
        topicsContainer.appendChild(topicsArr[i]);
}

/**
 * Creates an event to improve links on every top menu click (Ajax call)
 */
function improveLinksAddEvent() {
    // Define the event listener
    var OnNodeInserted = function (e) {
        // Check if the node contains the topic list
        if (e.target.classList.value === 'topic-list partial')
            improveLinks();
    };
    // Add the event listener
    document.getElementById('partial-index').addEventListener('DOMNodeInserted', OnNodeInserted, false);
}

/**
 * Warns against troll accounts by giving a red background to their comments
 */
function trollWarning() {
    var trollList = [
        // 16 kasım 2016 eklenenler
        'lord eddard stark',
        'dudayeva',
        'dinleyin ulan develer',
        'sick city',
        'rich peach',
        'the way we were',
        'hababam vokal grubu',
        'aab',
        'c2h5oh',
        'ibrahim tasteless',
        'popilikadam',
        'vanhohenheim',
        'balbarss',
        'comenger',
        'anti duhring',
        'ali bey amca',
        'kendini arayan adamin kendi',
        'yurtsevenfive',
        'proust',
        'hukuk ordinaryusu',
        'bill gates benim babam tamam mi',
        'said kotan',
        'this one',
        'gauldoth',
        'rampris2',
        'ivan drago',
        // 17 kasım 2016
        'writer on the water',
        'yusufnalkesen',
        'iqm',
        'soz buyugun',
        'simurg anka',
        'ormanci',
        'yazar olmam engellenemez',
        'ne nicki be',
        'samatya',
        'bu saatte',
        '20 13',
        'pagan papagan',
        'mr and mrs brown',
        'kasimi severiz biz o baska bir guzeldir',
        'parisa',
        'tekid',
        // 15 mart 2017
        'optumsaygoodbye',
        'sakalli vasfi',
        'han hazretleri',
        'medellin',
        'liberteryen',
        // from other users
        'yapcak-bisi-yok',
        'fikirmuhendisifikri',
        // https://eksisozluk.com/entry/64141929
        'boldpilot',
        'burun mu o',
        'bymuss',
        'ehriman',
        'feel 1337',
        'galahad',
        'hayk0cepkin',
        'irfangerekli',
        'ponya',
        'presenceofthedarklord',
        'slv ard fc mrn die atl flc dgz pra m ass',
        'taksici milletin efendisidir',
        'these are the days of our lives',
        // trollspray
        'yenilikci dervis',
        'hepiniz oleceksiniz',
        'nerede o eski bayramlar',
        'buraya kadar gelmek',
        'mest ustune mesh',
        'salih bulut',
        'pagan papagan',
        'bynewyorker',
        'sebasteia sebasteia',
        'gok yeleli bozkurt',
        'afrocubanbebop',
        'iyi biri',
        'jasis',
        'hasbelicab',
        'iett 99 806',
        'onthebass',
        'paegan mushroom',
        'detroitli kizil',
        'bdeveci',
        'peder hose',
        'noryth aquanum',
        'don kulot',
        'kardanadam7853',
        'auer',
        'aziz vefa',
        'somek kafali',
        'the irlandali',
        'atmaa',
        'redlack',
        'idontgiveafuck',
        'ic benim icin',
        'cenikli',
        'owencan',
        'edwardscissorhand',
        'musanelka',
        'kimmugirl',
        'dont let it get to you',
        'emin',
        'naftalinli don',
        'vincent ugurlu',
        'kizilay 404',
        'evetisyan',
        'multiple intelligentiis',
        'noxan',
        'sergey abdulkaramazov',
        'men kucik chomichmen',
        'speranza',
        'ippolit kirillovic',
        'and justice erol',
        'beyaz adam',
        'baso',
        'ed statik',
        'montmartre sakini',
        'karisik meyve aromali gazoz',
        'gettin crunk',
        'kuzeysanrisigibidirgeceyibesefilanboler',
        'kartoncu',
        'evde black smoke besleyen adam',
        'submarine solo',
        'kaptan maydanoz',
        'bir gurultu aninda',
        'parabola',
        'ozzy osporny',
        'karabetgulludere',
        'gael garcia bernalin ikizi',
        'yvzerg',
        'excaliboor',
        'bir cevabim yok ama soru guzelmis',
        'neseli ispanak',
        'at yalani sikeyim inanani',
        'iknowyouwantme',
        'gogdabor',
        'burdan post modern nicklere selam ederim',
        'cornivolk',
        'ledallamafrench',
        'eksibok',
        'srfydn',
        'cok bilinmeyenli denklem',
        // Other
        'nick bulmam lazim',
        'michael owen',
        'rke',
        'asilcanarkadasbenim',
        'behlul olarak giris yapmak istiyorum',
        'omeremre42',
        'abdal karga',
        'alchemisto',
        'bynpass',
        'diyorum',
        'elinherifi',
        'fenahuyluspazo',
        'hebirisi',
        'hulyodelivaldez',
        'imsorry',
        'ittin bittin',
        'jariomardel',
        'karacakurt',
        'kubito',
        'mesinieskimiskeneftakunyasi',
        'pilye',
        'postfuturistic oomph girl',
        'risksever',
        'seraneva',
        'seymayaziyor',
        'sinefili',
        'uzak yolculuk',
        'wolkeno',
        // 2018.01.04
        'alebahad',
        'antepcityboy',
        'azizjohn',
        'baba fett',
        'cengizem',
        'drizzt do urden',
        'ferrarisi olmayan adam',
        'hanryk',
        'noktanoktabiiiiiiiiiipnokta',
        'kalemcalan',
        'kaidesini bozan istisna',
        'lostdiary',
        'neylesinmahmut',
        'papipapipapuculo',
        'paolno',
        'sakinolsampiyonnn',
        'similing face',
        'sofistike sofi',
        'various artist'
    ];
    // Select all entries which have 'data-author' attribute
    var nodes = document.querySelectorAll('li[data-author]');
    // Check if any of them is troll
    Array.prototype.forEach.call(nodes, function (node) {
        if (trollList.indexOf(node.dataset.author) !== -1)
            node.style.backgroundColor = '#533';
    });
}

/**
 * Removes unnecessary parts. CSS hiding is not enough! :)
 */
function removeParts() {
    // List of selectors to remove
    var removeList = [
        'aside',
        '#site-footer',
        '.ads',
        'iframe',
        'script',
        'noscript',
        '.eksiseyler-logo',
        '[href$="adtitles"]',
        '.topic-list li[id*=sponsored]'
    ];
    // Select them
    var nodes = document.querySelectorAll(removeList.join(','));
    // Remove them
    removeNodes(nodes);
    // Remove next siblings of the container
    nodes = getNextSiblings(document.getElementById('container'), false);
    removeNodes(nodes);
}

/**
 * Start process
 */
removeParts();
improveLinks();
improveLinksAddEvent();
trollWarning();
