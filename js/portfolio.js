$(document).ready(function (){
	populateFilters();
})

var skills = [];

var skillDetails = {
		wp: {
			"name": "Wordpress",
			"url": "https://wordpress.org/",
			"description": "<p>Wordpress is primarily a blogging system however also powers some large websites. At last count the software powered in the region of around 20% of all websites on the internet. The software is highly customizeable and features a powerful plugin system.</p>"
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
		mysql: {
			"name": "MySQL",
			"url": "https://www.mysql.com/",
			"description": "<p>MySQL (and the offshoot MariaDB) is the most widely used relational database currently in use. Being installed by default in many flavours of Linux has made it a popular choice among web hosts and software developers. Although open source, the software is owned by Oracle.</p>"
		},
		jquery: {
			"name": "jQuery",
			"url": "https://jquery.com/",
			"description": "<p>jQuery is a Javascript library that facilitated code that is compatible with a wide variety of browsers. The library also has built-in functionality to facilitate tasks such as element transitions.</p>"
		},
		html5: {
			"name": "HTML 5",
			"url": "https://www.w3.org/TR/html5/",
			"description": "<p>HTML 5 is the newest standard for HTML. The aims of the standard were to help overcome deficiencies of the previous standard. HTML 5 introduces new functionality helping eradicate the need for plugins such as Flash. The standard also opened new elements to help identify the purpose of each element of a page.</p>"
		},
		bootstrap: {
			"name": "Bootstrap",
			"url": "http://getbootstrap.com/",
			"description": "<p>Bootstrap is a library that helps in the design of web pages. Bootstrap is commonly used to help build a conforming design through the use of a grid system. Bootstrap also works very closely with the popular Javascript library jQuery.</p>"
		},
		nodejs: {
			"name": "Node.js",
			"url": "https://nodejs.org/",
			"description": "<p>Node.js is an event-driven javascript runtime. Opposed to running Javascript on the client side, Node.js utilises javascript on the server side.</p>"
		},
		lambda: {
			"name": "Lambda",
			"url": "https://aws.amazon.com/lambda/",
			"description": "<p>Lambda, 1 of the many tools made available by Amazon in their AWS quite of services is an event-driven platform. Lambda enables developers to have an instance that is only consuming resources as and when needed rather than the always-on model of VPS or other hosted solutions. 1 of the frameworks that are heavily used within Lambda is the Node.js runtime and has over the last couple of years become commonly used in the creation of Amazon Alexa Skills.</p>"
		},
		ask: {
			"name": "Alexa Skills Kit",
			"url": "https://developer.amazon.com/alexa-skills-kit",
			"description": "<p>The Alexa Skills Kit is a set of tools and SDK's that enable developers to create skills for the Amazon Echo range of devices.</p>"
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
		js: {
			"name": "Javascript",
			"url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
			"description": "<p>Originally developed by Netscape, Javascript has become the client side language of choice to allow client-side events. With the release of technologies such as Node.js, Javascript has also become a popular choice for server-side programming in event-driven environment.</p>"
		}
	};

function populateFilters(){
	$(".skill").each(function(){
		skills[$(this).attr("class").split(' ')[1]] = $(this).text();
	})
	var keys = Object.keys(skills).sort();
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
	$(".project").css("display", "none");
	$(".project").has("section ul ." + skill).css("display", "block");
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
	$(".skill-details a").text(skillDetails[skill].name);
	$(".skill-details a").attr("href", skillDetails[skill].url);
	$(".skill-details article").html(skillDetails[skill].description);
	$(".skill-details").css("display", "block");
}