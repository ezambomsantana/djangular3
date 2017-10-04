angular.module('appapi', ['appajax']);

angular.module('appapi').factory('AppApi', function(AppAjax){
	var api = {
		add: todo,
		login: login,
		logout: logout,
		whoami: whoami,
		list_cameras: list_cameras,
		list_cameras_filter_by_house : list_cameras_filter_by_house,
		list_houses: list_houses,
		get_user_details: get_user_details,
	};

	function todo(){}

	function login(username, password){
		return AppAjax.post('/api/login', {username: username, password: password});
	}

	function logout(){
		return AppAjax.get('/api/logout');
	}

	function whoami(){
		return AppAjax.get('/api/whoami');
	}

	function list_cameras(filters){
		return AppAjax.get('/api/list_cameras', {filters: angular.toJson(filters)});
	}

	function list_houses(filters){
		return AppAjax.get('/api/list_houses', {filters: angular.toJson(filters)});
	}

	function list_cameras_filter_by_house(filters){
		return AppAjax.get('/api/list_cameras_filter_by_house', {filters: angular.toJson(filters)});
	}
	
	function get_user_details(username){
		return AppAjax.get('/api/get_user_details', {username: username});	
	}

	return api;
});
