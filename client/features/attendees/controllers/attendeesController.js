angular.module('covey.attendees', [])
.controller('attendeesController', function ($rootScope, $scope, attendeesHelpers, attendeesHttp) {
  $scope.newAttendee = '';

  attendeesHttp.getAllAttendees().then((attendees) => {
    $scope.attendees = attendees;
    $rootScope.attendees = $scope.attendees;
  });

  $scope.addAttendee = (newAttendeeId) => {
    attendeesHttp.addAttendee(newAttendeeId).then((response) => {
      console.log(response);
    });
    $scope.newAttendee = '';
  };

  // $scope.removeAttendee = (attendee) => {
  //   attendeesHttp.removeAttendee(attendee, coveyId);
  //   attendeesHelpers.removePassenger(attendee, coveyId);
  //   attendeesHelpers.removeSupplier(attendee, coveyId);
  // };

  // const removeFromAttendees = (friend) => {
  //   $scope.details.attendees.forEach((attendee, index) => {
  //     if (attendee === friend) {
  //       $scope.details.attendees.splice(index, 1);
  //     }
  //   });
  // };

  // const removeFromPassengers = (friend) => {
  //   const isPassenger = $scope.checkPassenger(friend);
  //   if (isPassenger !== null) $scope.removePassenger(friend, { id: isPassenger });
  // };

  // const removeFromSuppliers = (friend) => {
  //   $scope.supplies.supplies.forEach((supply) => {
  //     supply.suppliers.forEach((supplier, index) => {
  //       if (supplier === friend) {
  //         supply.suppliers.splice(index, 1);
  //       }
  //     });
  //   });
  // };

  // $scope.removeFriend = (friend) => {
  //   removeFromAttendees(friend);
  //   removeFromPassengers(friend);
  //   removeFromSuppliers(friend);
  // };
});