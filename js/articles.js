$(document).ready(function (){
    populateFilters();
});

let skills = [];

let skillDetails = {
    linux: {
        "name": "Linux",
        "url": "https://wordpress.org/",
        "description": "<p>Linux powers most of the moden internet including services such as Amazons AWS. Having Linux knowledge is a must for any self respecting developer..</p>"
    },
    sysops: {
        "name": "Sysops",
        "url": "https://php.net/",
        "description": "<p>PHP is a scripting language originally created by Rasmus Lerdorf. The language has grown to be 1 of the most widely used in web development.</p>"
    },
    security: {
        "name": "Security",
        "url": "https://www.postgresql.org/",
        "description": "<p>Security is such an important subject however is often overlooked.</p>"
    }
};

function populateFilters(){
    $(".skill").each(function(){
        skills[$(this).attr("class").split(' ')[1]] = $(this).text();
    });
    let keys = Object.keys(skills).sort();
    $.each(keys, function(index, skill){
        if(skills.hasOwnProperty(skill)){
            addFilter(skill, skills[skill]);
        }
    });
    $(".filter a").click(function(){
        showAllProjects();
        showSelectedProjects($(this).attr("id"));
    });
    $(".remove-current-filter a").click(function(){
        showAllProjects();
        HideSkillDescription();
    });
}

function addFilter(filterID, filter){
    $(".filter-list").append("<li class='filter'><a href='#' id='" + filterID + "'>" + filter + "</li>");
}

function showAllProjects(){
    $(".project").css("display", "block");
    $(".skill").css("font-weight", "normal");
    $(".remove-filter").css("display", "none");
}

function showSelectedProjects(skill){
    let project = $(".project");
    project.css("display", "none");
    project.has("section ul ." + skill).css("display", "block");
    $("." + skill).css("font-weight", "bold");
    $(".remove-filter").css("display", "block");
    ShowSkillDescription(skill);
}

function HideSkillDescription(){
    $(".skill-details").css("display", "none");
    $(".skill-details a").text("");
    $(".skill-details a").attr("href", "#");
    $(".skill-details article").html("");
}

function ShowSkillDescription(skill){
    if(!skillDetails.hasOwnProperty(skill)){
        HideSkillDescription();
        return;
    }
    let skillDetails = $(".skill-details a");
    skillDetails.text(skillDetails[skill].name);
    skillDetails.attr("href", skillDetails[skill].url);
    $(".skill-details article").html(skillDetails[skill].description);
    skillDetails.css("display", "block");
}