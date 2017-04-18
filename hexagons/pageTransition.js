$(document).ready(function() {
	var $pages = $(document.body).children(".page");
	var dispType = ["currentFlex", "current", "currentBlock", "current"]
	var amtPages = $pages.length;
	var currPage = 0;
	var nextPage = 1;
	var prevPage = amtPages - 1;

	var animating = false;

	console.log($pages);

	$(".nextPageButton").on("click", function() {
		if (animating) return;
		animating = true;
		transition($pages, currPage, nextPage, "next");
	});

	$(".homeButton").on("click", function() {
		if (animating || currPage === 0) return;
		animating = true;
		transition($pages, currPage, 0);
	});

	$(".aboutButton").on("click", function() {
		if (animating || currPage === 1) return;
		animating = true;
		transition($pages, currPage, 1);
	});

	$(".workButton").on("click", function() {
		if (animating || currPage === 2) return;
		animating = true;
		transition($pages, currPage, 2);
	});

	$(".contactButton").on("click", function() {
		if (animating || currPage === 3) return;
		animating = true;
		transition($pages, currPage, 3);
	});

	/* 	This function does a slide transition between two pages
	*	If a direction is given, it is used. Otherwise, 
	* 	the function will calculate the most appropriate direction
	*/
	function transition($list, p1, p2, dir="") {
		var endCurrAnim = false;
		var endTargetAnim = false;

		var $currP = $list.eq(p1);
		var $targetP = $list.eq(p2);

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

		$targetP.addClass(dispType[p2]);
		$targetP.addClass("current");

		$currP.addClass(currAnim).on("animationend", function() {
			$currP.off("animationend");
			$currP.removeClass(currAnim);
			endCurrAnim = true;
			if (endTargetAnim) {
				updateCurrent($list, p2);
			}
		});

		$targetP.addClass(targetAnim).on("animationend", function() {
			$targetP.off("animationend");
			$targetP.removeClass(targetAnim);
			endTargetAnim = true;
			if (endCurrAnim) {
				updateCurrent($list, p2);
			}
		});
	}

	function updateCurrent($list, newCurr) {
		console.log("Update Current");
		$list.eq(currPage).removeClass("current");
		$list.eq(currPage).removeClass(dispType[currPage]);

		currPage = newCurr;
		nextPage = (currPage + 1) % amtPages;
		prevPage = ((currPage - 1) + amtPages) % amtPages;
		animating = false;
	}
	return;
});