"use strict";

$(function (){
    populateFilters();
});

let skills = [];

let skillDetails = {
    ask: {
        "name": "Alexa Skills Kit",
        "url": "https://developer.amazon.com/alexa-skills-kit",
        "description": "<p>The Alexa Skills Kit is a set of tools and SDK's that enable developers to create skills for the Amazon Echo range of devices.</p>"
    },
    bootstrap: {
        "name": "Bootstrap",
        "url": "http://getbootstrap.com/",
        "description": "<p>Bootstrap is a library that helps in the design of web pages. Bootstrap is commonly used to help build a conforming design through the use of a grid system. Bootstrap also works very closely with the popular Javascript library jQuery.</p>"
    },
    composer: {
        "name": "Composer",
        "url": "https://packagist.org",
        "description": "<p>Composer is a PHP package manager.</p>"
    },
    drupal: {
        "name": "Drupal",
        "url": "https://www.drupal.org/",
        "description": "<p>Drupal is a popular CMS system. Unlike Wordpress Drupal natively supports numerous databases such as MySQL, PostgreSQL and SQLite. Drupal is customisable through the installation of plugins and skinnable through the creation or modification of themes.</p>"
    },
    html: {
        "name": "HTML",
        "url": "https://html.spec.whatwg.org/multipage/",
        "description": "<p>HTML originally created by Tim Berners-Lee in 1990, the original aim was to allow people to share documents that all PC's could understand instead of using the proprietary formats that each PC had built in. HTML went on to become the standard used for creating websites on the internet.</p>"
    },
    html5: {
        "name": "HTML 5",
        "url": "https://www.w3.org/TR/html5/",
        "description": "<p>HTML 5 is the newest standard for HTML. The aims of the standard were to help overcome deficiencies of the previous standard. HTML 5 introduces new functionality helping eradicate the need for plugins such as Flash. The standard also opened new elements to help identify the purpose of each element of a page.</p>"
    },
    jquery: {
        "name": "jQuery",
        "url": "https://jquery.com/",
        "description": "<p>jQuery is a Javascript library that facilitated code that is compatible with a wide variety of browsers. The library also has built-in functionality to facilitate tasks such as element transitions.</p>"
    },
    js: {
        "name": "Javascript",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        "description": "<p>Originally developed by Netscape, Javascript has become the client side language of choice to allow client-side events. With the release of technologies such as Node.js, Javascript has also become a popular choice for server-side programming in event-driven environment.</p>"
    },
    lambda: {
        "name": "Lambda",
        "url": "https://aws.amazon.com/lambda/",
        "description": "<p>Lambda, 1 of the many tools made available by Amazon in their AWS quite of services is an event-driven platform. Lambda enables developers to have an instance that is only consuming resources as and when needed rather than the always-on model of VPS or other hosted solutions. 1 of the frameworks that are heavily used within Lambda is the Node.js runtime and has over the last couple of years become commonly used in the creation of Amazon Alexa Skills.</p>"
    },
    mysql: {
        "name": "MySQL",
        "url": "https://www.mysql.com/",
        "description": "<p>MySQL (and the offshoot MariaDB) is the most widely used relational database currently in use. Being installed by default in many flavours of Linux has made it a popular choice among web hosts and software developers. Although open source, the software is owned by Oracle.</p>"
    },
    neo4j: {
        "name": "Neo4j",
        "url": "https://neo4j.com/",
        "description": "<p>Neo4j is a popular graph database.</p>"
    },
    nodejs: {
        "name": "Node.js",
        "url": "https://nodejs.org/",
        "description": "<p>Node.js is an event-driven javascript runtime. Opposed to running Javascript on the client side, Node.js utilises javascript on the server side.</p>"
    },
    php: {
        "name": "PHP",
        "url": "https://php.net/",
        "description": "<p>PHP is a scripting language originally created by Rasmus Lerdorf. The language has grown to be 1 of the most widely used in web development.</p>"
    },
    psql: {
        "name": "PostgreSQL",
        "url": "https://www.postgresql.org/",
        "description": "<p>PostgreSQL is an open-source standard compliant relational database software that adheres closely to the ANSI-SQL:2008 standard. Unlike MySQL, PostgreSQL was built from the ground up adhering to relational concepts and supports relationships through foreign keys.</p>"
    },
    wp: {
        "name": "Wordpress",
        "url": "https://wordpress.org/",
        "description": "<p>Wordpress is primarily a blogging system however also powers some large websites. At last count the software powered in the region of around 20% of all websites on the internet. The software is highly customizeable and features a powerful plugin system.</p>"
    }
};

/**
 * Locates filters for addFilter uses to populate list
 */
function populateFilters(){
    $(".skill").each(function(){
        skills[$(this).attr("class").split(" ")[1]] = $(this).text();
    });
    let keys = Object.keys(skills).sort();
    $.each(keys, function(index, skill){
        if(skills.hasOwnProperty(skill)){
            addFilter(skill, skills[skill]);
        }
    });
    $(".filter a").on("click",function(){
        showAllProjects();
        showSelectedProjects($(this).attr("id"));
    });
    $(".remove-current-filter a").on("click",function(){
        showAllProjects();
        HideSkillDescription();
    });
}

/**
 * Creates a list of filters
 * @param {string} filterID - ID of the filter
 * @param filter - Dictionary of details regarding the filter
 */
function addFilter(filterID, filter){
    let list_item = $("<li>");
    $(list_item).addClass('filter');
    let link = $("<a>");
    link.attr("href", "#");
    link.attr("id", filterID);
    link.text(filter);
    $(list_item).append(link);
    $('.filter-list').append(list_item);
}

/**
 * Resets view to show all projects when filter removed
 */
function showAllProjects(){
    $(".project").css("display", "block");
    $(".skill").css("font-weight", "normal");
    $(".remove-filter").css("display", "none");
}

/**
 * Shows projects that match a filter
 * @param {string} skill - The skill being used as a filter
 */
function showSelectedProjects(skill){
    let project = $(".project");
    project.css("display", "none");
    project.has("section ul ." + skill).css("display", "block");
    $("." + skill).css("font-weight", "bold");
    $(".remove-filter").css("display", "block");
    ShowSkillDescription(skill);
}

/**
 * Hides any displayed text describing the filtered skill.
 */
function HideSkillDescription(){
    let skillDetailsLink = $(".skill-details a");
    $(".skill-details").css("display", "none");
    skillDetailsLink.text("");
    skillDetailsLink.attr("href", "#");
    $(".skill-details article").html("");
}

/**
 * Displays information text about the selected skill
 * @param {string} skill - The skill being used as a filter
 */
function ShowSkillDescription(skill){
    let skillDetailsLink = $(".skill-details a");
    if(!skillDetails.hasOwnProperty(skill)){
        HideSkillDescription();
        return;
    }
    skillDetailsLink.text(skillDetails[skill].name);
    skillDetailsLink.attr("href", skillDetails[skill].url);
    $(".skill-details article").html(skillDetails[skill].description);
    $(".skill-details").css("display", "block");
}