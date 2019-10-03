"use strict";

$(function (){
    populateFilters();
});

let categories = [];

let categoryDetails = {
    linux: {
        "name": "Linux",
        "description": "<p>Linux powers most of the modern internet including services such as Amazons AWS. Having Linux knowledge is a must for any self respecting developer.</p>"
    },
    programming: {
        "name": "Programming",
        "description": "<p>Programming is a very useful skill not only for developers but also sysops.</p>"
    },
    security: {
        "name": "Security",
        "description": "<p>Security is such an important subject however is often overlooked.</p>"
    }
};

/**
 * Locates filters for addFilter uses to populate list
 */
function populateFilters(){
    $(".category").each(function(){
        categories[$(this).attr("class").split(" ")[1]] = $(this).text();
    });
    let keys = Object.keys(categories).sort();
    $.each(keys, function(index, category){
        if(categories.hasOwnProperty(category)){
            addFilter(category, categories[category]);
        }
    });
    $(".filter a").on("click",function(){
        showAllArticles();
        showSelectedArticles($(this).attr("id"));
    });
    $(".remove-current-filter a").on("click",function(){
        showAllArticles();
        HideCategoryDescription();
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
 * Resets view to show all articles when filter removed
 */
function showAllArticles(){
    $(".project").css("display", "block");
    $(".category").css("font-weight", "normal");
    $(".remove-filter").css("display", "none");
}

/**
 * Shows articles that match a filter
 * @param {string} category - The category being used as a filter
 */
function showSelectedArticles(category){
    let project = $(".project");
    project.css("display", "none");
    project.has("section ul ." + category).css("display", "block");
    $("." + category).css("font-weight", "bold");
    $(".remove-filter").css("display", "block");
    ShowCategoryDescription(category);
}

/**
 * Hides any displayed text describing the filtered category.
 */
function HideCategoryDescription(){
    let categoryDetailsLink = $(".category-details a");
    $(".category-details").css("display", "none");
    categoryDetailsLink.text("");
    categoryDetailsLink.attr("href", "#");
    $(".category-details article").html("");
}

/**
 * Displays information text about the selected category
 * @param {string} category - The category being used as a filter
 */
function ShowCategoryDescription(category){
    if(!categoryDetails.hasOwnProperty(category)){
        HideCategoryDescription();
        return;
    }
    $(".category-details a").text(categoryDetails[category].name);
    $(".category-details article").html(categoryDetails[category].description);
    $(".category-details").css("display", "block");
}