app.controller("MainController", function($scope){
	$scope.understand = "I now understand how the scope works";
	$scope.inputValue = "";
	$scope.selectedPerson = 0;
	$scope.selectedHobby = null;
	$scope.people = [
		{id: 0, name: "William", hobbies: ["hiking","camping","dancing"], live:true},
		{id: 1, name: "James", hobbies: ["flying","driving","sports"], live:true},
		{id: 2, name: "Mario", hobbies: ["jumping","stomping","saving princesses"], live:false},
		{id: 3, name: "Lance", hobbies: ["hiking","camping","sports"], live:false},
	];
	
	$scope.newPerson = null;
	$scope.newPersonHobbies = null;
	$scope.newPersonActive = false;

	$scope.addNew = function() {
		if ($scope.newPerson != null && $scope.newPerson != "") {
			//Add person object to array
			$scope.people.push({
				id: $scope.people.length,
				name: $scope.newPerson,
				live: $scope.newPersonActive,
				hobbies: $scope.newPersonHobbies.split(';')
			});
		}
		$scope.newPerson = null;
		$scope.newPersonHobbies = null;
		$scope.newPersonActive = false;
	}

	$scope.inputName = "";
});