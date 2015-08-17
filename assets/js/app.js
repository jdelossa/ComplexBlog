/**
 * Created by Joanna on 08/02/2015.
 */

var app = angular.module('ComplexBlogApp', ['ngRoute', 'ui.bootstrap']);

/**
 * Routes
 */
app.config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'partials/blog.html',
        controller: "blogPostController"
    }).when('/list', {
        templateUrl: 'partials/blog.html',
        controller: "blogPostController"
    }).when('/add', {
        templateUrl: 'partials/header.html',
        controller: "addPostController"
    }).when('/edit/:id/', {
        templateUrl: 'partials/_edit.html',
        controller: 'editPostController'
    }).when('/view/:id/', {
        templateUrl: 'partials/_view.html',
        controller: 'viewPostController'
    }).when('/view/:id/delete', { controller: 'deletePostController'})
    .otherwise({
        templateUrl: 'partials/404.html',
        controller: 'notExistController',
    });
});

/**
 * Blog Posts
 */
app.service('postService', function(){
    this.posts = [
        {
            index: 0,
            title: 'Angular Blog',
            author: 'Joanna De Los Santos',
            date: '08/02/2015',
            category: 'Casual',
            content: 'Love This!',
        },
        {
            index: 1,
            title: 'Sorry, Your Posts Will Delete',
            author: 'Joanna De Los Santos',
            date: '08/07/2015',
            category: 'Code',
            content: 'Because this application does not have a database and JavaScript cannot write to files, this any added posts will be deleted upon page refresh!',
        },
        {
            index: 2,
            title: 'Well, Here Comes The Sun',
            author: 'The Weeknd',
            date: '08/08/2015',
            category: 'Music',
            content: 'A great song by The Weeknd. This song is on his first album: Trilogy',
        },
    ];
});

/******************************************************** Controllers ********************************************************/

/**
 * List all Blog Post
 */
app.controller('blogPostController', function($scope, postService, $modal, $log) {
    $scope.posts = postService.posts;

    $scope.open = function () {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'addPostController',
            size: 'lg',
            resolve: {
                add: function(){
                    return $scope.add
                }
            }
        });
    };

});

/**
 * Add new Blog Post
 */
app.controller('addPostController', function($scope, $location, postService, $modalInstance) {

    $scope.post = { title: "", author: "", date: "", category: "", content: "" };

    $scope.add = function() {
        postService.posts.push($scope.post);
        $location.path('/');
        $modalInstance.close({
            animation: $scope.animationsEnabled
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

});

/**
 * View One Blog Post
 */
app.controller('viewPostController', function($scope, $routeParams, $location) {

    $scope.post = $scope.posts[$routeParams.id];

    $scope.update = function() {
        $location.path('/');
    };
});

/**
 * Edit existing Blog Post
 */
app.controller('editPostController', function($scope, $routeParams, $location) {

    $scope.post = $scope.posts[$routeParams.id];

    $scope.reset = function() {
        $scope.post = angular.copy($scope.posts);
    };

    $scope.update = function() {
        $location.path('/');
    };
});

/**
 * 404 Controller
 */
app.controller('notExistController', function($scope, $routeParams, $location) {

    $scope.post = $scope.posts[$routeParams.id];

    $scope.update = function() {
        $location.path('/');
    };
});

/**
 * My Date Format
 */

app.filter('myDateFormat', function myDateFormat($filter){
    return function(text){
        var  tempdate= new Date(text.replace(/-/g,"/"));
        return $filter('date')(tempdate, "MMMM d, y");
    }
});