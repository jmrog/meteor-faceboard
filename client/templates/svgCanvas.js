/*** SETUP ***/
var canvasContainerOffset;
var wallId;

function drawPointsOnCanvas(points) {
    if (points.length < 1) {
        resetCanvas();
    } else {
        d3.select('#svgCanvasContainer svg')
            .selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cx', function (point) {
                return point.x;
            })
            .attr('cy', function (point) {
                return point.y;
            })
            .style('stroke', function (point) {
                return point.lineColor;
            })
            .style('fill', function (point) {
                return point.lineColor;
            });
    }
}

function insertCircle(x, y, lineColor, offsetAlreadyIncluded) {
    if (!offsetAlreadyIncluded) {
        x -= canvasContainerOffset.left;
        y -= canvasContainerOffset.top;
    }

    Meteor.call('insertCirclePoint', wallId, {
        x: x,
        y: y,
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
Template.svgCanvas.onRendered(function() {
    Tracker.autorun(function () {
        canvasContainerOffset = Session.get('svgCanvasContainerOffset');
    });
    Tracker.autorun(function () {
        // respond to route changes
        var isNewWall = FlowRouter.getQueryParam('newWall') === 'true';
        wallId = FlowRouter.getParam('wallId');

        Meteor.call('getCanvasForId', wallId, function (err, canvas) {
            if (err || !canvas || !canvas.circlePoints) {
                if (!isNewWall) {
                    Alerts.set('Sorry, we couldn\'t find a wall with that id. A new canvas has been loaded instead.');
                    FlowRouter.go('/wall');
                }
                resetCanvas();
            } else {
                resetCanvas();
                drawPointsOnCanvas(canvas.circlePoints);
            }
        });
    });
    Tracker.autorun(function() {
        // This function controls the drawing itself.
        var canvas = Canvas.findOne({ _id: wallId });
        if (canvas && canvas.circlePoints) {
            drawPointsOnCanvas(canvas.circlePoints);
        }
    });

    canvasContainerOffset = $('#svgCanvasContainer').offset();
    Session.set('svgCanvasContainerOffset', canvasContainerOffset);
    Session.set('lineColor', 'black');
});

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
                Meteor.call('clearCanvas', wallId, resetCanvas);
                break;

            case "save":
                Meteor.call('saveCanvas', wallId, function(err, canvasId) {
                    if (err) {
                        // TODO: Do something here.
                        return;
                    }

                    Alerts.set('Your wall has been saved. Use (or bookmark) the URL in the browser bar to return to this wall in the future.', 'success');
                    FlowRouter.go('/wall/' + canvasId);
                });
                break;

            default:
                Session.set('lineColor', evt.target.id);
        }
    }
});

