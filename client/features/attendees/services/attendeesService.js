angular.module('covey.attendees')
.service('attendeesHelpers', function () {
  this.removePassenger = (attendee, coveyId) => {};
  this.removeSupplier = (attendee, coveyId) => {};
})
.service('attendeesHttp', function ($http, $routeParams) {
  this.getAllAttendees = () => {
    return $http.get(`/api/users/${$routeParams.coveyId}`)
    .then((users) => users.data, (error) => {
      console.error(error);
    });
  };

  this.addAttendee = (attendeeId) => {
    return $http.post(`/api/coveys/${$routeParams.coveyId}/${attendeeId}`, {})
    .then((response) => response, (error) => {
      console.error(error);
    });
  };

  // this.removeAttendee = (attendee, coveyId) => {
  //   $http.delete(`/api/coveys/${coveyId}/${attendee.id}`)
  //   .then((response) => response, (error) => {
  //     console.error(error);
  //   });
  // };
});