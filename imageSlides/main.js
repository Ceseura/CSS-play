$(document).ready(function() {
	var animating = false;

	var $pics = $('.frame').children('.pic');
	var $caps = $('.dataFrame').children();
	var $navDots = $('.navDotsBar').children();
	var amtPics = $pics.length;

	var curr = 0;
	var next = 1;
	var prev = amtPics-1;

	console.log($pics);

	/* 	This function does a slide transition between two pages
	*	If a direction is given, it is used. Otherwise, 
	* 	the function will calculate the most appropriate direction
	*/
	function transition(p1, p2, dir="") {
		console.log($pics);
		var endCurrAnim = false;
		var endTargetAnim = false;

		var $currP = $pics.eq(p1);
		var $targetP = $pics.eq(p2);

		var currAnim;
		var targetAnim;

		if (dir === "") {
			currAnim = (p1 < p2) ? "animMoveToLeft" : "animMoveToRight";
			targetAnim = (p1 < p2) ? 
					"animMoveFromRight" : "animMoveFromLeft";
			dir = (p1 < p2) ? "next" : "prev";
		} else if (dir === "next") {
			currAnim = "animMoveToLeft";
			targetAnim = "animMoveFromRight";
		} else if (dir === "prev") {
			currAnim = "animMoveToRight";
			targetAnim = "animMoveFromLeft";
		}


		console.log(dir);

		$targetP.addClass("current");

		$currP.addClass(currAnim).on("animationend", function() {
			$currP.off("animationend");
			$currP.removeClass(currAnim);
			endCurrAnim = true;
			if (endTargetAnim) {
				updateCurrent(p2);
			}
		});

		$navDots.eq(p1).removeClass("activeNavDot");
		$navDots.eq(p2).addClass("activeNavDot");

		$targetP.addClass(targetAnim).on("animationend", function() {
			$targetP.off("animationend");
			$targetP.removeClass(targetAnim);
			endTargetAnim = true;
			if (endCurrAnim) {
				updateCurrent(p2);
			}
		});

		$caps.eq(p1).hide();
		$caps.eq(p2).fadeIn(1000);

	}

	$('.nextButton').on('click', function() {
		if (animating) return;
		animating = true;

		transition(curr, next, "next");
	});

	$(".prevButton").on("click", function() {
		if (animating) return;
		animating = true;

		transition(curr, prev, "prev");
	});

	for (var i = 0; i < amtPics; i++) {
		$navDots.eq(i).on("click", generate_handler(i));
	}

	function generate_handler(i) {
		return function() {
			if (animating) return;
			animating = true;

			transition(curr, i);
		};
	}

	function updateCurrent(newCurr) {
		console.log("Update Current");
		$pics.eq(curr).removeClass("current");

		curr = newCurr;
		next = (curr + 1) % 4;
		prev = ((curr - 1) + 4) % 4;

		console.log("curr: " + curr);
		console.log("next: " + next);
		console.log("prev: " + prev);
		animating = false;
	}
});