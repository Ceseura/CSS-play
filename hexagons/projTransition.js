$(document).ready(function() {
	var $cWrappers = $(".contentWrapperViewport").children(".contentWrapper");
	var $hexagons = $("#grid").children();
	var currContent = 0;
	var animating = false;

	var $pics = $(".content0").children(".pic");
	var currPic = $pics.index($(".content0").find(".current"));
	var currentFlag = "";
	var appendMe = "";
	updateIndexButtons();

	$(".nextPicButton").on("click", function(){
		if (animating) return;
		animating = true;
		var nextPic = (currPic+1) % $pics.length;
		transition2($pics, currPic, nextPic, "next");
		updateCurrIndexButton(nextPic);
	});

	$(".prevPicButton").on("click", function() {
		if (animating) return;
		animating = true;
		var prevPic = ((currPic-1)+$pics.length) % $pics.length;
		transition2($pics, currPic, prevPic, "prev");
		updateCurrIndexButton(prevPic);
	});


	for (var i = 0; i < $hexagons.length; i++) {
		$(".hex"+i).on("click", generateHandler(i));
	}

	function generateHandler(i) {
		return function() {
			if (animating || currContent === i) return;
			animating = true;
			transition2($cWrappers, currContent, i, "vert");

			$pics = $(".content"+i).children(".pic");
			currPic = $pics.index($(".content"+i).find(".current"));
			updateIndexButtons();
		}
	}

	function updateIndexButtons() {
		appendMe = '';

		for (var j = 0; j < $pics.length; j++) {
			appendMe += '<div class="indexButton"></div>';
		}
		$(".indexBar").html(appendMe);

		var $indexButtons = $(".indexBar").children(".indexButton");

		updateCurrIndexButton(currPic);

		$indexButtons.each(function() {
			$(this).on("click", function() {
				var myIndex = $indexButtons.index($(this));
				if (animating || currPic === myIndex) return;
				animating = true;
				updateCurrIndexButton(myIndex);
				transition2($pics, currPic, myIndex);
			});
		});
	}

	function updateCurrIndexButton(targetPic) {
		$(".indexBar").children(".activeIndexButton").removeClass("activeIndexButton");
		$(".indexBar").children(".indexButton").eq(targetPic).addClass("activeIndexButton");
	}

	/* 	This function does a slide transition between two pages
	*	If a direction is given, it is used. Otherwise, 
	* 	the function will calculate the most appropriate direction
	*/
	function transition2($list, p1, p2, dir="") {
		var endCurrAnim = false;
		var endTargetAnim = false;

		var $currP = $list.eq(p1);
		var $targetP = $list.eq(p2);
		var length = $list.length;
		currentFlag = "current";


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
		} else if (dir === "vert") {
			currentFlag = "currentFlex";
			currAnim = (p1 < p2) ? "animMoveToUp" : "animMoveToDown";
			targetAnim = (p1 < p2) ? 
					"animMoveFromDown" : "animMoveFromUp";
		}


		$targetP.addClass(currentFlag);

		$currP.addClass(currAnim).on("animationend", function() {
			$currP.off("animationend");
			$currP.removeClass(currAnim);
			endCurrAnim = true;
			if (endTargetAnim) {
				updateCurrent2($list, p2, dir);
			}
		});

		$targetP.addClass(targetAnim).on("animationend", function() {
			$targetP.off("animationend");
			$targetP.removeClass(targetAnim);
			endTargetAnim = true;
			if (endCurrAnim) {
				updateCurrent2($list, p2, dir);
			}
		});
	}


	function updateCurrent2($list, newCurr, dir) {
		console.log($list);
		var index = (dir === "vert") ? currContent : currPic;
		$list.eq(index).removeClass(currentFlag);

		if (dir === "vert") currContent = newCurr;
		else currPic = newCurr;
		animating = false;
	}
});