(function() {
  var module = angular.module('m.ziax.dk', []);
  module.directive('zMap', [function () {
    return {
      restrict: 'A',
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        var t = this,
            map = L.map($element[0], { center: [55, 11], zoom: 5 }),
            base1 = L.tileLayer("http://{s}.tile.cloudmade.com/7900B8C7F3074FD18E325AD6A60C33B7/997/256/{z}/{x}/{y}.png",{ attribution:'' }).addTo(map),
            base2 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '' }),
            chooser = L.control.layers({ 'Modern': base1, 'Basic': base2 }, {}, { position: 'bottomleft' }).addTo(map);

        t.map = map;
        t.chooser = chooser;

        $scope.$on('$destroy', function() {
          map.remove();
        });

      }],
      link: function(scope, element, attrs) {
      }
    };
  }]);

  module.directive('zMapFindMe', [function () {
    return {
      restrict: 'A',
      require: 'zMap',
      link: function(scope, element, attrs, zmap) {


      var map = zmap.map,
          layer = L.featureGroup().addTo(map),
          marker = L.marker([50.5, 30.5]).addTo(layer);
          circle = L.circle([50.5, 30.5], 200).addTo(layer);



      var watchId = navigator.geolocation.watchPosition(success, error, { maximumAge: 3000, timeout: 60000, enableHighAccuracy: true });


      function success(pos) {
        marker.setLatLng([ pos.coords.latitude, pos.coords.longitude ]);
        circle.setRadius(pos.coords.accuracy/10);
        circle.setLatLng([ pos.coords.latitude, pos.coords.longitude ]);

        map.fitBounds(circle.getBounds());
      }

      function error() {

      }



        scope.$on('$destroy', function() {
          navigator.geolocation.clearWatch(watchID);
          map.removeLayer(layer);
        });
      }
    };
  }]);
}());