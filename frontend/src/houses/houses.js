angular.module('houses', ['appapi']);

angular.module('houses').factory('HousesRepository', function(AppApi){
	var m = {
		loading: false,
		houses: [],
	};

	angular.extend(m, {
		init: init,
	});

	function init(){
		m.loading = true;
		AppApi.list_houses().then(function(result){
			m.houses = result.data;
		}).finally(function(){
			m.loading = false;
		});
	}

	return m;
});

angular.module('houses').directive('houses', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'houses/houses.html',
		controller: function($scope, HousesRepository){
			HousesRepository.init();
			$scope.repo = HousesRepository;
		},
	};
});