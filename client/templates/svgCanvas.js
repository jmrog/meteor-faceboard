var canvasContainerOffset = Session.get('svgCanvasContainerOffset');

Tracker.autorun(function() {
    canvasContainerOffset = Session.get('svgCanvasContainerOffset');
});

function insertCircle(x, y) {
    Meteor.call('insertCirclePoint', {
        x: x - canvasContainerOffset.left,
        y: y - canvasContainerOffset.top
    });
}

Template.svgCanvas.events({
    'mousedown #svgCanvasContainer': function() {
        Session.set('isDrawing', true);
    },
    'mouseup': function() {
        Session.set('isDrawing', false);
    },
    'mousemove #svgCanvasContainer': function(evt) {
        if (Session.get('isDrawing')) {
            insertCircle(evt.pageX, evt.pageY);
        }
    },
    'click button': function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        switch  (evt.target.id) {
        
        case "clear":

          Meteor.call('clearCanvas');
          d3.select('#svgCanvasContainer svg').remove();
          d3.select('#svgCanvasContainer').append('svg').attr('width', 500).attr('height', 500);
          break;

        case "save":

          break;


        case "red" :
          Session.set("lineColor", "red");
          break;

        case "blue" :
          Session.set("lineColor", "blue");
          break;

        case "green" :
          Session.set("lineColor", "green");
          break;

        case "orange" :
          Session.set("lineColor", "orange");
          break;

        case "yellow" :
          Session.set("lineColor", "yellow");
          break;

        case "white" :
          Session.set("lineColor", "white");
          break;

        default: 
          Session.set("lineColor", "black");
        }
    },

});

