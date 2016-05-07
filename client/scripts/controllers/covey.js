angular.module('covey.covey', [])

.controller('coveyController', function ($scope) {
  // TODO: get user id/details from local storage
  $scope.user = 'Skye Free';

  // on /covey load, use factory GET request for covey table details
  $scope.details = {
    id: 1,
    eventName: 'Camping With Friends',
    time: '6PM',
    location: 'Yosemite, CA',
    attendees: ['Freddie Ryder', 'Rahim Dharssi', 'Toben Green', 'Skye Free'],
  };

  $scope.updateCovey = () => {
    // make PUT request to update covey event details
    console.log($scope.details);
  };
})
.directive('coveyDetails', () => (
  {
    templateUrl: 'views/coveyDetails.html',
  }
))
.directive('coveyAttendees', () => (
  {
    templateUrl: 'views/coveyAttendees.html',
    controller: 'attendeesController',
  }
))
.directive('rides', () => (
  {
    templateUrl: 'views/rides.html',
    controller: 'ridesController',
  }
))
.directive('supplies', () => (
  {
    templateUrl: 'views/supplies.html',
    controller: 'suppliesController',
  }
));