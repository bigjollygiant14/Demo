var array = [["1",1], ["2",2], ["3",3], ["4",4], ["5",5], ["6",6], ["7",7], ["8",8], ["9",9], ["10",10]];

function addFiscalYear(){
	//Block UI to prevent users from navigating away
	$.blockUI();
	//Get list name
	var list = $('#listDiv :selected').text();
	//Get desired value
	var selectedValue = $('#valueDiv :selected').text();
	//set year value
	var year;
	if ( Number($('#yearSelect').val()) === 1 ? year = $('#yearSelect').val() : year = $('#yearSelect :selected').text() );
	//alert beginning operation
	alert("Beginning population. You will be alerted when the rows have been created.");
	//for each item in array
	for (var x = 0; x < array.length; x++){
		//if the desired value equals the value in the array, then update
		if (Number(selectedValue) === array[x][1]){
			//Add query string to array
			array[x].push("<Query><Where><Eq><FieldRef Name='Column1' LookupId='TRUE' /><Value Type='Lookup'>" + array[x][1] + "</Value></Eq></Where><OrderBy><FieldRef Name='Column1' Ascending='TRUE' /><FieldRef Name='Column2' Ascending='True' /></OrderBy></Query>");
			//execute async to get items from Old List
			GetListItems(function(resxml) {
				$(resxml.responseXML).find("z\\:row").each(function(){
					//Convert returned XML to object
					var i = GetRowItem(this);

					i.textField = i.textField.replace(/</gi,'%3C').replace(/>/gi,'%3E'); //replace forbidden characters
					//add fields to update xml array
					update_xml.push(
						{cmd:"New",
							fields:[
		        				{name: "A", value: i.numberField},
		        				{name: "B", value: i.booleanField},
		        				{name: "C", value: i.textField},
		        			]
		        		}
		        	);
		        	
				});//End Each
				
				//Add data from old list to new list
				UpdateList(function(resxml, stat){
					//unblock the UI
					$.unblockUI();
					//alert complete
					alert(array[x][0] + " has been added");
					//reload page to refresh form
					window.location.reload();

				},update_xml,list);//end async for update
			},array[x][2],"List to Update"); //end async for get
		}
	}
}

function GetRowItem(i) {
	var item = {};
	item.numberField = Number( $(xml).find('numberField').text() );
	item.booleanField = $(xml).find('booleanField').text();
	item.textField = $(xml).find('textField').text();
	return item;
}
function GetListItems(postload,spquery,listname) {		
	var a=ROOT_SP_SITE_str+"/_vti_bin/lists.asmx";
	var b="<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'><listName>"+listname+"</listName><viewName></viewName><query>"+spquery+"</query><viewFields><ViewFields></ViewFields></viewFields><rowLimit>3500</rowLimit><QueryOptions/><webID></webID></GetListItems></soap:Body></soap:Envelope>";
	$.ajax({url:a,type:"POST",dataType:"xml",data:b,contentType:"text/xml; charset=\'utf-8\'",complete:postload});	
}