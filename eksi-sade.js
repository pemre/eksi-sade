'use strict';

/**
 * Sorts and colourises side menu links
 */
function improveLinks() {
    // Remove sponsored links
    $('.topic-list li[id*=sponsored]').remove();

    $('.topic-list a').each(function() {
        var t = $(this);

        /*// Relative url fix
        t.attr('href', 'https://eksisozluk.com' + t.attr('href'));
        t.attr('title', t.text());*/

        /*// Crop long texts
        var textObj = t.contents().first()[0];
        if (textObj.textContent.length > 46)
            textObj.textContent = textObj.textContent.slice(0, -4) + '.. ';*/

        // Rank can be like "2,2b", convert it into numbers
        var rankText = t.contents().last()[0].textContent;
        if (rankText.substr(-1) === 'b') {
            rankText = rankText.substring(0, rankText.length - 1);
            if (rankText.indexOf(',') >= 0)
                rankText = rankText.replace(',', '') + "00";
            else
                rankText += "000";
            t.contents().last()[0].textContent = rankText;
        }

        // Give colors
        var rank = Number(rankText);
        if (rank > 1000)     t.css('color', '#ff0000');
        else if (rank > 500) t.css('color', '#ff8000');
        else if (rank > 300) t.css('color', '#ffbf00');
        else if (rank > 200) t.css('color', '#ffff00');
        else if (rank > 100) t.css('color', '#bfff00');
        else if (rank > 80)  t.css('color', '#55ff00');
        else if (rank > 60)  t.css('color', '#00ff55');
        else if (rank > 40)  t.css('color', '#00ffbf');
        else if (rank > 20)  t.css('color', '#00bfff');
        else if (rank > 10)  t.css('color', '#0088bb');
        else if (rank > 0)   t.css('color', '#5599aa');
    });

    // Sort function callback
    var sortLi = function (a, b) {
        var na = Number($(a).children().first().children().first().html());
        var nb = Number($(b).children().first().children().first().html());
        return nb > na ? 1 : -1;
    };

    $('.topic-list li').sort(sortLi)    // sort elements
        .appendTo('.topic-list');       // append again to the list
}
/**
 * Warns against troll accounts by giving a red background to their comments
 */
function trollWarning() {
    var trollList = [
        // 16 kasım 2016 eklenenler
        "lord eddard stark",
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
        'omeremre42'
    ];

    $('li[data-author]').each(function() {
        var t = $(this);
        if($.inArray(t.data('author'), trollList) !== -1) {
            t.css('background-color', '#533')
        }
    });
}
/**
 * Creates an event to improve links on every top menu click (Ajax call)
 */
function improveLinksAddEvent() {
  $('#partial-index').on('DOMNodeInserted', function(e) {
    // Check if the node contains the topic list
    if (e.target.classList.value === "topic-list partial") {
      improveLinks();
    }
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
    '.eksiseyler-logo'
  ];
  // Remove them
  $(removeList.join(",")).remove();
  // Remove next siblings of the container
  $('#container').nextAll().remove();
  //removeSelectorSiblings("#container");
}

/**
 * Start process
 */
improveLinks();
improveLinksAddEvent();
trollWarning();
removeParts();
