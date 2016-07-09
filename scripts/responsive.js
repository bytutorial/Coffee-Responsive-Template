/*****
Licensed under MIT
copyright 2016 andy suwandy
https://bytutorial.com/framework-and-scripts-library/responsive
https://github.com/bytutorial
v1.2 11 May 2016
This script is purely for handling the mobile menu only, this can be ignored if you want to use the responsive css framework only or build your own menu navigation
****/
(function ($) {
    $.extend({
        responsive: function (options) {
			//default settings
            var settings = $.extend({}, options);
			
			$("#menu-button").on("click", function(event){
				$("ul.nav-menu").attr("slide", ( $("ul.nav-menu").attr("slide") != "1" || typeof $("ul.nav-menu").attr("slide") === "undefined" ? "1" : "0"));
				if($("ul.nav-menu").attr("slide") == "1"){
					switch($(this).attr("data-action")){
						case "right-slide":
							$("body, ul.nav-menu").toggleClass("right-slide");
							$("ul.nav-menu, #transparent-bg").show();
							break;
						case "left-slide":
							$("body, ul.nav-menu").toggleClass("left-slide");
							$("ul.nav-menu, #transparent-bg").show();
							break;
						default:
							$("ul.nav-menu").slideDown();
							break;
					}
				}else{
					resetMenuDisplay();
				}
			});
			
			//window resize
			$(window).resize(function(event){if($(this).width() > 764){resetMenuDisplay();$("ul.nav-menu").show(); $("ul.nav-menu li ul").removeAttr("style");}else{resetMenuDisplay();}});
			
			if ($("#transparent-bg").length == 0) {
				$("body").prepend("<div id='transparent-bg'></div>");
				
				$("#transparent-bg").on("click", function(){
					resetMenuDisplay();
				}); 
			}
			
			function resetMenuDisplay(){
				$("ul.nav-menu, #transparent-bg").hide();
				$("body, ul.nav-menu").removeClass("right-slide left-slide");
				$("ul.nav-menu").attr("slide", "0");
				$("ul.nav-menu li ul").hide();
				$("ul.nav-menu li span.arrow").removeClass("arrow-down");
			}
			
			function setArrowCollapsable(){
				//using jquery to loop each li element and automatically add an arrow span if the element contains a child of ul list
				$('ul.nav-menu li').each(function(){
					if ($(this).find('ul').length > 0)
					{
						$(this).addClass("has-child");
						$(this).prepend("<span class='arrow'></span>");
					}
				});
		
				$('ul.nav-menu > li.has-child a').on("click", function(event){
					var currentArrow = $(this).parent().find(" > span");
					setArrowEvent(currentArrow);
				});
				
				$('ul.nav-menu > li.has-child span.arrow').on("click", function(event){
					var currentArrow = $(this);
					setArrowEvent(currentArrow);
				});
			}
			
			function setArrowEvent(currentArrow){
				if($(currentArrow).length > 0){
					if($(currentArrow).attr("class").indexOf("arrow-down") > 0){
						$(currentArrow).removeClass("arrow-down");
						$(currentArrow).parent().find(" > ul").slideUp();
					}else{
						$(currentArrow).addClass("arrow-down");
						$(currentArrow).parent().find(" > ul").slideDown();
					}
				}
			}
			
			setArrowCollapsable();
		}
	});
})(jQuery);