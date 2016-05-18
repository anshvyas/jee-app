var app = angular.module('myApp' , []);

app.directive('fileModel',['$parse',function($parse){
	return {
		restrict:'A',
		link:function(scope,element,attrs){
			var model=$parse(attrs.fileModel);
			var modelSetter=model.assign;

			element.bind('change',function(){
				scope.$apply(function(){
					modelSetter(scope,element[0].files[0]);
				});
			});
		}
	}

}]);

app.controller('maincontroller' , function($scope , $http)
{
	$scope.insertdata = function(){

		var formdata=new FormData();
		formdata.append('serial_no',JSON.stringify($scope.serialnumber));
		formdata.append('subject',JSON.stringify($scope.subject));
		formdata.append('topic',JSON.stringify($scope.topic));
		formdata.append('sub_topic',JSON.stringify($scope.subtopic));
		formdata.append('question',$scope.question);
		formdata.append('answer',$scope.answer);
		formdata.append('hint',$scope.answer);

		uploadUrl='http://localhost:3000/questions/add/';

		$http.post(uploadUrl,formdata,{
			headers: {'Content-Type':undefined},
			transformRequest:angular.identity
		})
		.success(function(data){
			console.log(data);
		})
		.error(function(data){
			console.log(data);
		});

		}

});

