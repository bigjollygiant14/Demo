//Canvas
Raphael.st.compoundPath = function(){
    var positions = [];
    this.forEach( function( element ){
        positions.push( element.compoundPath() );
    });
    return positions.join('');
} 
Raphael.el.compoundPath = function(){
    var path = this.attr('path');
    return path ? Raphael.parsePathString( path ).join('') : '';
}

svgmapping = {
	initMap: function() {
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		var attr = {
			fill: "#333",
			stroke: "#666",
			"stroke-width": 1,
			"stroke-linejoin": "round"
		};
		
		//alert(width + " " + height);
		if (width > 980 && height > 870) {
			var R = Raphael("paper", 1060, 600);
		} else if (width > 980) {
			var R = Raphael("paper", 1060, 600);
			R.setViewBox(0, 0, width, height, false);
		} else if (width > 760) {
			var R = Raphael("paper", 1060, 600);
			R.setViewBox(0, 0, width, height, false);
		} else if (width > 680) {
			var R = Raphael("paper", 954, 530);
			R.setViewBox(0, 0, width, height, false);
		} else {
			var R = Raphael("paper", 954, 530);
			R.setViewBox(0, 0, width, height, false);
		}
		
		//R.setViewBox(0, 0, width, height, false);
		//paper.canvas.setAttribute('preserveAspectRatio', 'none');
		
		var usa = {};
		var xhr = new XMLHttpRequest();
		
		xhr.open('GET', 'lib/Blank_US_Map.svg', true);

		xhr.onload = function() {
			svgmapping.loadStates(this.responseXML, R, attr, usa);
		};
		xhr.send();
	},

	loadStates: function(responseXML, R, attr, usa) {
		var tempCount = 0;
		var tempStr1 = "";
		var tempStr2 = "";
        $(responseXML).find('g').find('path').each(function(){
        	if (tempCount === 0) {
        		tempStr1 = this.getAttribute('d');

        	} else {
        		tempStr2 = this.getAttribute('d');
        		var someSet = R.set(R.path(tempStr1).attr(attr),R.path(tempStr2).attr(attr));
				//someSet.remove(); // if you want to replace the set with a compound path
				usa['MI'] = R.path( someSet.compoundPath() ).attr(attr);
        	}
        	tempCount ++;
        });
        
        $(responseXML).find('path').each(function(){
        	if (this.getAttribute('id') === 'MI-' || this.getAttribute('id') === 'SP-') {
        	} else {
        		usa[this.getAttribute('id')] = R.path(this.getAttribute('d')).attr(attr);
        	}
        });
        svgmapping.animate(usa, R);
	},

	animate: function(usa, R) {
        var current = null;
		for (var state in usa) {
			usa[state].color = Raphael.getColor();
			(function (st, state) {
				st[0].style.cursor = "pointer";
				st[0].onclick = function () {
					current && usa[current].animate({fill: "#333", stroke: "#666"}, 500) && (document.getElementById(current).style.display = "");
					st.animate({fill: st.color, stroke: "#ccc", transform: "s1.3"}, 500);
					st.toFront();
					R.safari();
					document.getElementById(state).style.display = "block";
					current = state;
				};
				st[0].onmouseout = function () {
					st.animate({fill: "#333", stroke: "#666", transform: "s1"}, 500);
					st.toFront();
					R.safari();
				};
				if (state == "nsw") {
					st[0].onmouseover();
				}
			})(usa[state], state);
		}
		svgmapping.callback();
	},

	availableXML: [],

	getNavLinks: function() {
		$.getJSON( "lib/availableXML.json", function( data ) {
			var opt = "<hr><div id='mapOptions'>Select an issue:<br><select id='xmlSelect'><option value='void'>Please select an option</option>";
			$.each( data, function( key, val ) {
				svgmapping.availableXML.push( {key: key, dname: val.dname, link: val.hyperlink} );
				opt += "<option value='" + key + "'>" + val.dname + "</option>";
			});

			opt += "</select></div>";
			$('#xmlOptionsDiv').append(opt);
			events.addEvent('#xmlSelect', function(){
				svgmapping.getXML();
			});
		});
		svgmapping.initMap();
	},
	
	getXML: function() {
		//Get item of interest
		var overlayQuery = $('#xmlSelect').val();
		if (overlayQuery === 'void') {
			alert('Please select a report');
		} else {
			_.filter(svgmapping.availableXML, function( availableXML ) { 
				if ( availableXML.key === Number(overlayQuery) ) {
					overlayResponse = availableXML.link;
				}
			});

		    /* Create State Divs/Data */
			$.ajax({
				type: "GET",
				//url: "vote_113_1_00288.xml",
				url: overlayResponse,
				dataType: "xml",
				success: function(xml) {
					//Document Metadata
					var count = $(xml).find( "count" );
					var doc_meta = {
						congress : $(xml).find('congress').text(),
						session : $(xml).find('session').text(),
						vote_number : $(xml).find('vote_number').text(),
						vote_date : $(xml).find('vote_date').text(),
						vote_question_text : $(xml).find('vote_question_text').text(),
						vote_document_text : $(xml).find('vote_document_text').text(),
						vote_result_text : $(xml).find('vote_result_text').text(),
						vote_title : $(xml).find('vote_title').text(),
						majority_requirement : $(xml).find('majority_requirement').text(),
						vote_result : $(xml).find('vote_result').text(),

						yeas : count.find('yeas').text(),
						nays : count.find('nays').text(),
						present : count.find('present').text(),
						absent : count.find('absent').text()
					};

					//Member Metadata
					var member_meta = [];
					$(xml).find('member').each(function(){
						var member = $(this);
						var d = {
							member_full: member.find('member_full').text(),
							last_name: member.find('last_name').text(),
							first_name: member.find('first_name').text(),
							party: member.find('party').text(),
							state: member.find('state').text(),
							vote_cast: member.find('vote_cast').text(),
							lis_member_id: member.find('lis_member_id').text()
						};
						member_meta.push(d);
					});
					svgmapping.page.populateHeader(doc_meta)
					svgmapping.page.populateDivs(member_meta);
				}
			});
		}
	},

	helper: {
		parseState: function(stateID) {
			switch(stateID) {
				case 'AL':
					return 'ALABAMA';
				case 'AK':
					return 'ALASKA';
				case 'AS':
					return 'AMERICAN SAMOA';
				case 'AZ':
					return 'ARIZONA';
				case 'AR':
					return 'ARKANSAS';
				case 'CA':
					return 'CALIFORNIA';
				case 'CO':
					return 'COLORADO';
				case 'CT':
					return 'CONNECTICUT';
				case 'DE':
					return 'DELAWARE';
				case 'DC':
					return 'DISTRICT OF COLUMBIA';
				case 'FM':
					return 'FEDERATED STATES OF MICRONESIA';
				case 'FL':
					return 'FLORIDA';
				case 'GA':
					return 'GEORGIA';
				case 'GU':
					return 'GUAM';
				case 'HI':
					return 'HAWAII';
				case 'ID':
					return 'IDAHO';
				case 'IL':
					return 'ILLINOIS';
				case 'IN':
					return 'INDIANA';
				case 'IA':
					return 'IOWA';
				case 'KS':
					return 'KANSAS';
				case 'KY':
					return 'KENTUCKY';
				case 'LA':
					return 'LOUISIANA';
				case 'ME':
					return 'MAINE';
				case 'MH':
					return 'MARSHALL ISLANDS';
				case 'MD':
					return 'MARYLAND';
				case 'MA':
					return 'MASSACHUSETTS';
				case 'MI':
					return 'MICHIGAN';
				case 'MN':
					return 'MINNESOTA';
				case 'MS':
					return 'MISSISSIPPI';
				case 'MO':
					return 'MISSOURI';
				case 'MT':
					return 'MONTANA';
				case 'NE':
					return 'NEBRASKA';
				case 'NV':
					return 'NEVADA';
				case 'NH':
					return 'NEW HAMPSHIRE';
				case 'NJ':
					return 'NEW JERSEY';
				case 'NM':
					return 'NEW MEXICO';
				case 'NY':
					return 'NEW YORK';
				case 'NC':
					return 'NORTH CAROLINA';
				case 'ND':
					return 'NORTH DAKOTA';
				case 'MP':
					return 'NORTHERN MARIANA ISLANDS';
				case 'OH':
					return 'OHIO';
				case 'OK':
					return 'OKLAHOMA';
				case 'OR':
					return 'OREGON';
				case 'PW':
					return 'PALAU';
				case 'PA':
					return 'PENNSYLVANIA';
				case 'PR':
					return 'PUERTO RICO';
				case 'RI':
					return 'RHODE ISLAND';
				case 'SC':
					return 'SOUTH CAROLINA';
				case 'SD':
					return 'SOUTH DAKOTA';
				case 'TN':
					return 'TENNESSEE';
				case 'TX':
					return 'TEXAS';
				case 'UT':
					return 'UTAH';
				case 'VT':
					return 'VERMONT';
				case 'VI':
					return 'VIRGIN ISLANDS';
				case 'VA':
					return 'VIRGINIA';
				case 'WA':
					return 'WASHINGTON';
				case 'WV':
					return 'WEST VIRGINIA';
				case 'WI':
					return 'WISCONSIN';
				case 'WY':
					return 'WYOMING';
				default: 
			}
		}
	},

	page: {
		populateHeader: function(doc_meta){
			var header = "<div id='issueTitle' class='issueTitle'><h1>Vote Number: " + doc_meta.vote_number + " - " + doc_meta.vote_date + "</h1>";
			header += "<h2>" + doc_meta.vote_title + "</h2>";
			header += "<h3>" + doc_meta.vote_result_text + "</h3>";
			header += "<div class='minorMeta'><p><b>" + doc_meta.congress + "th Congress</b></p>"
			header += "<p>Date: " + doc_meta.vote_date + "</p>";
			header += "<p>Yeas: " + doc_meta.yeas + "; Nays: " + doc_meta.nays + "; Absent: " + doc_meta.absent + "; Required: " + doc_meta.majority_requirement + "</p>";
			header += "</div></div>";
			$('#pageSubHead').empty().append(header);
		},

		populateDivs: function(member_meta){
			$('#sideBarResults').empty();
			for (var i = 0; i < member_meta.length; i++) {
				var stateID = member_meta[i].state.toUpperCase();
				//$('#canvas').append("<div id='" + stateID + "' class='state'><h2>" + stateID + "</h2></div>");
				$('#sideBarResults').append("<div id='" + stateID + "' class='state'><h2>" + svgmapping.helper.parseState(stateID) + "</h2></div>");
				
				if (member_meta[i].vote_cast === "Not Voting") {
					var str = member_meta[i].first_name + " " + member_meta[i].last_name + " (" + member_meta[i].party + ", " + member_meta[i].state + ") did not vote.";
				} else {
					var str = member_meta[i].first_name + " " + member_meta[i].last_name + " (" + member_meta[i].party + ", " + member_meta[i].state + ") voted " + member_meta[i].vote_cast + ".";
				}
				$("#" + stateID).append('<p>' + str + '</p>');
			}
		}
	},
	
	callback: null,

	init: function(callback) {
		svgmapping.callback = callback;
		svgmapping.getNavLinks();
	}

}//End Object

events = {
	listeners: [],

	addEvent: function(selector, script) {
		events.listeners.push(selector, script, events.index);
		events.index += 1;
		$(selector).change(function(){
			script();
		});
	},

	index: 0
}

//Dom Loaded
$(function() {
	svgmapping.init(function(){
		//callback goes here
	});
});