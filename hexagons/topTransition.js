$(document).ready(function() {
	$(".bubble").on("click", function() {
		$(".topBar").addClass("current");

		$(".topBar").addClass("animMoveFromUp").on("animationend", function() {
			$(this).off("animationend");
			$(this).removeClass("animMoveFromUp");
			$(".topBar").on("mouseleave", function() {
				$(this).off("mouseleave");
				$(this).addClass("animMoveToUp").on("animationend", function() {
					$(this).removeClass("animMoveToUp");
					$(this).off("animationend");
					$(this).removeClass("current");
				});
			});
		});
	});
});