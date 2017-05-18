/**
 * Removes unnecessary parts
 *
 * @param list
 */
function removeParts() {
    // List of selectors to remove
    var removeList = [
        'header',
        'aside',
        '#site-footer',
        '.ads',
        'iframe',
        'script',
        'noscript',
        '.quick-index-continue-link-container'
    ];
    // Remove them
    $(removeList.join(",")).remove();
    // Remove next siblings of the container
    $('#container').nextAll().remove();
    //removeSelectorSiblings("#container");
}
/**
 * Applies a dark theme
 */
function applyTheme() {
    $('body')
        .css('padding', '0')                            // Pull the rest of the site to top
        .css('background-color', '#333')                // Dark background
        .css('color', '#ddd');                          // Light text
    $('#index-section').css('top', '0');                // Pull the rest of the site to top
    $('a').css('color', '#53a245');                     // Green links
    $('#main').css('margin-left', '370px');             // Wider side menu
    $('#index-section').css('width', '370px');
    $('.topic-list > li > a').css('padding', '3px 0');  // Compact side menu links
}
/**
 * Sorts and colourises side menu links
 */
function improveLinks() {
// Remove sponsored links
    $('.topic-list li[id*=sponsored]').remove();

    $('.topic-list a').each(function() {
        //$(this).attr('href', 'https://eksisozluk.com' + $(this).attr('href'));
        //$(this).attr('title', $(this).text());
        // Crop long texts
        //textObj = $(this).contents().first()[0];
        //if (textObj.textContent.length > 46)
        //    textObj.textContent = textObj.textContent.slice(0, -4) + '.. ';

        // Rank can be like "2,2b", convert it into numbers
        rankText = $(this).contents().last()[0].textContent;
        if (rankText.substr(-1) == 'b') {
            rankText = rankText.substring(0, rankText.length - 1);
            if (rankText.indexOf(',') >= 0)
                rankText = rankText.replace(',', '') + "00";
            else
                rankText += "000";
            $(this).contents().last()[0].textContent = rankText;
        }

        // Give colors
        rank = Number(rankText);
        if (rank > 1000)     $(this).css('color', '#ff0000');
        else if (rank > 500) $(this).css('color', '#ff8000');
        else if (rank > 300) $(this).css('color', '#ffbf00');
        else if (rank > 200) $(this).css('color', '#ffff00');
        else if (rank > 100) $(this).css('color', '#bfff00');
        else if (rank > 80)  $(this).css('color', '#55ff00');
        else if (rank > 60)  $(this).css('color', '#00ff55');
        else if (rank > 40)  $(this).css('color', '#00ffbf');
        else if (rank > 20)  $(this).css('color', '#00bfff');
        else if (rank > 10)  $(this).css('color', '#0088bb');
        else if (rank > 0)   $(this).css('color', '#5599aa');
    });

    // Sort function callback
    var sortLi = function (a, b) {
        na = Number($(a).children().first().children().first().html());
        nb = Number($(b).children().first().children().first().html());
        return nb > na ? 1 : -1;
    };

    $('.topic-list li').sort(sortLi)    // sort elements
        .appendTo('.topic-list');       // append again to the list
}

/**
 * Start process
 */
removeParts();
applyTheme();
improveLinks();