/*** SETUP ***/
var canvasContainerOffset = Session.get('svgCanvasContainerOffset');

Tracker.autorun(function() {
    canvasContainerOffset = Session.get('svgCanvasContainerOffset');
});

/*** UTILITY METHODS ***/
function insertCircle(x, y, lineColor) {
    Meteor.call('insertCirclePoint', {
        x: x - canvasContainerOffset.left,
        y: y - canvasContainerOffset.top,
        lineColor: lineColor
    });
}

function resetCanvas() {
    d3.select('#svgCanvasContainer svg').remove();
    d3.select('#svgCanvasContainer').append('svg').attr('width', 500).attr('height', 500);
    Session.set('svgCanvasContainerOffset', $('#svgCanvasContainer').offset());
    Session.set('lineColor', 'black');
}

/*** ONRENDERED ***/
Template.svgCanvas.onRendered(resetCanvas);

/*** EVENTS ***/
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
                Meteor.call('clearCanvas', resetCanvas);
                break;

            case "save":
                Meteor.call('saveCanvas', function(err, canvasId) {
                    if (err) {
                        // TODO: Do something here.
                        return;
                    }

                    Alerts.set('Your wall has been saved. Use (or bookmark) the URL in the browser bar to return to this wall in the future.');
                    FlowRouter.go('/wall/' + canvasId);
                });
                break;

            default:
                Session.set('lineColor', evt.target.id);
        }
    }
});

