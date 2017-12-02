app.service('auth',['$http',function($http){
  this.login=function(username,password){
      return $http({
         method: 'POST',
         url: '/login',
         data: {username:username, password:password}
      }).then(function(response){
        if(response.status==401){console.log("get 401")};
  			return response.data;
  		});
    }
}])
