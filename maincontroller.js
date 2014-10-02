/*
Main Angular Controller for simple form
Example of MVC at work
*/

app.controller("MainController", function($scope){
	$scope.understand = "I now understand how the scope works";
	$scope.inputValue = "";
	$scope.selectedPerson = 0;
	$scope.selectedHobby = null;
	$scope.people = [
		{id: 0, name: "William", hobbies: ["hiking","camping","shooting"], live:true},
		{id: 1, name: "James", hobbies: ["flying","driving","sports"], live:true},
		{id: 2, name: "Mario", hobbies: ["jumping","stomping","saving princesses"], live:false},
		{id: 3, name: "Lance", hobbies: ["hiking","camping","sports"], live:false},
	];
	/*
	$scope.newPerson = null;
	$scope.addNew = function() {
		if ($scope.newPerson != null && $scope.newPerson != "") {
			$scope.people.push({
				id: $scope.people.length,
				name: $scope.newPerson,
				live: true,
				hobbies: []
			});
		}
	}

	$scope.json = function(){
		jQuery.getJSON( "availableXML.json", function( data ) {
			console.log(data);
			debugger;
		});
		debugger;
	}
	$scope.inputName = "";
	*/
});