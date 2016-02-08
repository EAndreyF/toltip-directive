(function () {
  'use strict';

  angular
    .module('cst.tooltip')
    .directive('cstTooltip', TooltipDirective);

  function TooltipDirective() {
    return {
      restrict: 'E',
      scope: {
        element: '=',
        icon: '=',
        canvas: '='
      },
      templateUrl: 'services/cst.tooltip/tooltip/tooltip.html',
      controller: TooltipCtrl,
      controllerAs: 'tp',
      bindToController: true
    };
  }

  TooltipCtrl.$inject = ['$scope', '$element', 'BZ_HEIGHT'];

  function TooltipCtrl($scope, $element, BZ_HEIGHT) {
    var tp = this;

    $element = $($element[0]);
    var $canvas = $element.find('canvas');
    var canvas = $canvas[0];
    var ctx = canvas.getContext("2d");

    var $tooltip = $element.find('.cst-tooltip');

    var tooptipOffset = {
      left: 0,
      right: 0
    };

    $scope.$watchGroup(['tp.canvas.width', 'tp.canvas.height'], function (newVal, oldVal, scope) {
      var width = +newVal[0].slice(0, -2);
      var height = +newVal[1].slice(0, -2);
      canvas.width = width;
      canvas.height = height;
      scope.tp._canvasLineDraw(width, height)
    });

    return {
      getMainStyle: getMainStyle,
      _canvasLineDraw: _canvasLineDraw
    };

    function getMainStyle() {
      var offset = $tooltip.offset();
      if (offset.left !== 0 || offset.top !== 0) {
        tooptipOffset = {
          left: -offset.left + 'px',
          top: -offset.top + 'px'
        }
      }
      return tooptipOffset;
    }

    function _canvasLineDraw(width, height) {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(width, height);
      ctx.bezierCurveTo(width, 0, 0, 0, 0, BZ_HEIGHT);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#6eb41d";
      ctx.stroke();
    }
  }

})();
