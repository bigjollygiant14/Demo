/*
Logic Puzzle JS
JavaScript Module Pattern
*/

puzzle = {

	Puzzle: function(puzzleArea, puzzleOptions){
		"use strict";
		var lengths = [];
		
		$.each(puzzleOptions.groupings, function(key, value){
			lengths.push(this.length);
		});
		
		puzzle.createPuzzleArea(puzzleArea, lengths);

		puzzle.generateHeaders(puzzleOptions);

		puzzle.generateClues(puzzleOptions.clues, puzzleOptions.clueMove, puzzleArea);
	},

	createPuzzleArea: function(puzzleArea, lengths){
		"use strict";
		//main area
		var table = "";
		table += "<div class='puzzleTable'>";

		//rows
		var colAdj = 0;
		var colAdjHolder = 0;
		//debugger;
		for (var i = 0; i < lengths.length; i++) {
			var headerColumn = true;
			//header adjustment for rows
			if (colAdjHolder !== 0) {
				table += "<div class='puzzleRow' id='row" + i + "'>";
				//columns
				for (var j = 0; j < lengths.length - (colAdj); j++) {
					if (headerColumn === true) {
						table += "<div class='puzzleRowHeaderValue' id='r" + i + "c" + j + "'></div>";
						headerColumn = false;
					} else {
						table += "<div class='puzzleItem' id='r" + i + "c" + j + "'></div>";
					}
				}
				//placeholders
				for (var k = 0; k < colAdj; k++) {
					table += "<div class='puzzleItemPlaceholder' id='r" + i + "c" + j + "'></div>";
				}
				colAdj++;
			} else {
				//table += "<div class='puzzleRowHeader' id='row" + i + "'>";
				table += "<div class='puzzleRow' id='row" + i + "'>";
				//header columns
				for (var j = 0; j < lengths.length - (colAdj); j++) {
					table += "<div class='puzzleRowColumnValue' id='r" + i + "c" + j + "'></div>";
				}
				colAdjHolder++;
			}
			//end row
			table += "</div>";
		}
		table += "</div>";
		$(puzzleArea).append(table);
		
		var squares = lengths[0] * lengths[0];
		for (var i = 0; i < squares; i++) {
			$('.puzzleItem').append('<div class="guessArea"></div>');
		}

		$('.guessArea').each(function(){
			$(this).click(function(){
				if (this.className === "guessArea"){
					$(this).addClass('guessAreaGreen');
				} else if (this.className === "guessArea guessAreaGreen") {
					$(this).removeClass('guessAreaGreen').addClass('guessAreaRed');
				} else {
					$(this).removeClass('guessAreaRed');
				}
			});
		});
	},
	
	generateHeaders: function(puzzleOptions){
		"use strict";
		var c = puzzleOptions.groupings.length - 1;
		var r = 2;
		for (var i = 0; i < puzzleOptions.groupings.length; i++){
			if (i === 0){
				puzzle.populateHeader(puzzleOptions.groupings[i],"#r0c1","column");
			} else if (i === 1) {
				puzzle.populateHeader(puzzleOptions.groupings[i],"#r1c0","row");
			} else {
				var div = "#r" + 0 + "c" + c;
				puzzle.populateHeader(puzzleOptions.groupings[i],div,"column");
				div = "#r" + r + "c" + 0;
				puzzle.populateHeader(puzzleOptions.groupings[i],div,"row");
				r += 1;
				c -= 1;
			}
		}
	},

	populateHeader: function(arr, div, marker){
		if (marker === "column"){
			$.each(arr, function(k, v){
				$(div).append("<div class='columnMarker'>" + v + "</div>")
			});
		} else {
			$.each(arr, function(k, v){
				$(div).append("<div class='rowMarker'>" + v + "</div>")
			});
		}
	},

	generateClues: function(clues, clueMove, pa){
		"use strict";
		var clueList = "";
		
		clueList += "<div class='clues'><ol>"
		
		$.each(clues, function(key, value){
			//CHANGE
			clueList += "<li><input type='checkbox' name='done' value='done'>" + value + "</li>";
		});

		clueList += "</ol></div>";
		$(puzzleArea).append(clueList);

		$('input[name="done"]').click(function(){
			$(this).parent().toggleClass('notNeeded');
		});

		if (clueMove === true){
			$(pa).prepend("<div class='options'><input type='button' value='Alternate Clues' id='alternateClues' onClick='javascript:void(0);'></input></div>");
			$('#alternateClues').click(function(){
				$('.clues').toggleClass('cluesToggle', 'clues');
			});
		}
	},

}