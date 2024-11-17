$(document).ready(function () {
	$(window).scroll(function () {
		var scrollPos = $(window).scrollTop();
		var elementPos = $("#myElement").offset().top;
		if (scrollPos > elementPos - 300) {
			$("#myElement").animate(
				{
					backgroundColor: "#ff0000",
					left: "0",
				},
				1000
			);
		}
	});
	$(".allimagen").show().addClass("animate__animated animate__bounceIn");
	$("#titulo").show().addClass("animate__animated animate__backInDown");
});
