$(document).ready(function(){
	var OldListArray = [];
	var NewListArray = [];
	//Items from Old List
	$().SPServices({
		operation: "GetListItems",
		listName: "Master List",
		async: false,
		completefunc: function(xData, Status){
			//console.log(Status);
			$(xData.responseXML).SPFilterNode("z:row").each(function(){
				OldListArray.push( $(this).attr('ows_Title') );
			});
			
			//Items from New List
			$().SPServices({
				operation: "GetListItems",
				listName: "Comparison List",
				async: false,
				completefunc: function(xData, Status){
					//console.log(Status);
					$(xData.responseXML).SPFilterNode("z:row").each(function(){
						NewListArray.push( $(this).attr('ows_Title') );
					});
					
					//Compare Arrays
					var itemsThatWereRemoved = _.difference(OldListArray, NewListArray);
					var itemsThatWereAdded = _.difference(NewListArray, OldListArray);
					
					//Print Table
					var d = "<table><tr><td>Pubs that were removed: </td><td>";
					for (var i = 0; i < itemsThatWereRemoved.length; i++) {
						d += itemsThatWereRemoved[i] + "; ";
					}
					d += "</td></tr><tr><td>Pubs that were added: </td><td>";
					for (var i = 0; i < itemsThatWereAdded.length; i++) {
						d += itemsThatWereAdded[i] + "; ";
					}
					d += "</td></tr></table>";

					$('#comparison').append(d);
					
				}//End New list Complete Func
			});//End GetListItems from New List
			
		}//End Old List Complete Func
	});//End GetListItems from Old List

});//End Document Ready function