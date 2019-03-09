$(document).ready(function (){
    populateFilters();
});

let categories = [];

let categoryDetails = {
    linux: {
        "name": "Linux",
        "description": "<p>Linux powers most of the moden internet including services such as Amazons AWS. Having Linux knowledge is a must for any self respecting developer..</p>"
    },
    programming: {
        "name": "Programming",
        "description": "<p>Programming is a very useful skill not only for developers but also sysops.</p>"
    },
    security: {
        "name": "Security",
        "description": "<p>Security is such an important subject however is often overlooked.</p>"
    },
    sysops: {
        "name": "Sysops",
        "description": "<p>PHP is a scripting language originally created by Rasmus Lerdorf. The language has grown to be 1 of the most widely used in web development.</p>"
    }
};

function populateFilters(){
    $(".category").each(function(){
        categories[$(this).attr("class").split(' ')[1]] = $(this).text();
    });
    let keys = Object.keys(categories).sort();
    $.each(keys, function(index, category){
        if(categories.hasOwnProperty(category)){
            addFilter(category, categories[category]);
        }
    });
    $(".filter a").click(function(){
        showAllProjects();
        showSelectedProjects($(this).attr("id"));
    });
    $(".remove-current-filter a").click(function(){
        showAllProjects();
        HideCategoryDescription();
    });
}

function addFilter(filterID, filter){
    $(".filter-list").append("<li class='filter'><a href='#' id='" + filterID + "'>" + filter + "</li>");
}

function showAllProjects(){
    $(".project").css("display", "block");
    $(".category").css("font-weight", "normal");
    $(".remove-filter").css("display", "none");
}

function showSelectedProjects(category){
    let project = $(".project");
    project.css("display", "none");
    project.has("section ul ." + category).css("display", "block");
    $("." + category).css("font-weight", "bold");
    $(".remove-filter").css("display", "block");
    ShowCategoryDescription(category);
}

function HideCategoryDescription(){
    let categoryDetailsLink = $(".category-details a");
    $(".category-details").css("display", "none");
    categoryDetailsLink.text("");
    categoryDetailsLink.attr("href", "#");
    $(".category-details article").html("");
}

function ShowCategoryDescription(category){
    if(!categoryDetails.hasOwnProperty(category)){
        HideCategoryDescription();
        return;
    }
    $(".category-details a").text(categoryDetails[category].name);
    $(".category-details article").html(categoryDetails[category].description);
    $(".category-details").css("display", "block");
}