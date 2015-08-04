
var app = angular.module('ComplexBlog', ['ngRoute', 'ui.bootstrap']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Blog
        .when("/", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function ($scope, $modal, $log) {
    // initial state
    $scope.posts = [
        {
            id: '1',
            title: 'A Blog Home Template for Bootstrap 3',
            author: 'Start Bootstrap',
            date: 'Aug 2, 2015',
            category: 'Casual',
            content: 'This is a very basic starter template for a blog homepage. It makes use of Font Awesome icons that are built into the Modern Business template, and it makes use of the Bootstrap 3 pager at the bottom of the page',
        }
    ];

    // open modal
    $scope.open = function () {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                addPost: function(){
                    return $scope.addPost
                }
            }
        });
    };
});


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, addPost) {
    $scope.addPost = addPost;
    $scope.add = function() {
        var newPost =
        {
            title: $scope.posts.title,
            author: $scope.posts.author,
            date: $scope.posts.date,
            category: $scope.posts.category,
            content: $scope.posts.content
        };
        $scope.posts.push(newPost);

        // reset the form and its validation
        $scope.posts.title = '';
        $scope.posts.author = '';
        $scope.posts.date = '';
        $scope.posts.category = '';
        $scope.posts.content = '';
        $scope.form.$setPristine(true);
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
