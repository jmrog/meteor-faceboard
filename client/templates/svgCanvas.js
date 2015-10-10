var canvasContainerOffset = Session.get('svgCanvasContainerOffset');

Tracker.autorun(function() {
    canvasContainerOffset = Session.get('svgCanvasContainerOffset');
});

function insertCircle(x, y, lineColor) {
    Meteor.call('insertCirclePoint', {
        x: x - canvasContainerOffset.left,
        y: y - canvasContainerOffset.top,
        lineColor: lineColor
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
            insertCircle(evt.pageX, evt.pageY, Session.get('lineColor'));
        }
    },
    'click button': function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        switch  (evt.target.id) {

            case "clear":
                Meteor.call('clearCanvas', function () {
                    d3.select('#svgCanvasContainer svg').remove();
                    d3.select('#svgCanvasContainer').append('svg').attr('width', 500).attr('height', 500);
                });
                break;

            case "save":
                Meteor.call('saveCanvas', function(err, canvasId) {
                    alert('Saved canvas with id: ' + canvasId);
                });
                break;

            default:
                Session.set('lineColor', evt.target.id);

        }
    }
});

