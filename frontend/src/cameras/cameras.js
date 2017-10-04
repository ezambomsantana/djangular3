angular.module('cameras', ['appapi']);

angular.module('cameras').factory('CamerasRepository', function(AppApi){
	var m = {
		loading: false,
		cameras: [],
		houses: [],
		filter_text: '',
		selected_house: '',
		filterByName: filterByName,
		filterByHouse: filterByHouse,
	};

	angular.extend(m, {
		init: init,
	});

	function init(){
		m.loading = true;
		AppApi.list_houses().then(function(result){
			m.houses = result.data;
		})
		AppApi.list_cameras().then(function(result){
			m.cameras = result.data;
		}).finally(function(){
			m.loading = false;
		});
	}

	function filterByName(){
		m.loading = true;
		AppApi.list_cameras(m.filter_text).then(function(result){
			m.cameras = result.data;
		}).finally(function(){
			m.loading = false;
		});
    };

    function filterByHouse(){
		m.loading = true;
		AppApi.list_cameras_filter_by_house(m.selected_house.address).then(function(result){
			m.cameras = result.data;
		}).finally(function(){
			m.loading = false;
		});
    };

	return m;
});

angular.module('cameras').directive('cameras', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: APP.BASE_URL+'cameras/cameras.html',
		controller: function($scope, CamerasRepository){
			CamerasRepository.init();
			$scope.repo = CamerasRepository;
		},
	};
});


