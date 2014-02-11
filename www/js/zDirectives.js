(function() {
  var module = angular.module('m.ziax.dk', []);
  module.directive('zMap', [function () {
    return {
      restrict: 'A',
      // scope: {},
      // priority: 1,
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        var t = this,
            map = L.map($element[0], { center: [0, 0], zoom: 12 }),
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
}());