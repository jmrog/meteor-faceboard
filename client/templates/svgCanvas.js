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

function startNewWall() {
    var newWallId = Random.id();
    Meteor.call('createCanvas', newWallId, function() {
        FlowRouter.go('/wall/' + newWallId);
    });
}

/*** ONRENDERED ***/
Template.svgCanvas.onRendered(function() {
    Meteor.startup(function() {
        wallId = FlowRouter.getParam('wallId');

        if (!wallId) {
            return startNewWall();
        }

        Tracker.autorun(function () {
            canvasContainerOffset = Session.get('svgCanvasContainerOffset');
        });
        Tracker.autorun(function () {
            Meteor.subscribe('canvas', wallId);
        });
        Tracker.autorun(function () {
            var canvas = Canvas.findOne({_id: wallId});
            if (canvas && canvas.circlePoints) {
                drawPointsOnCanvas(canvas.circlePoints);
            }
        });

        Session.set('svgCanvasContainerOffset', $('#svgCanvasContainer').offset());
        Session.set('lineColor', 'black');

        Meteor.call('clearCanvas', function () {
            resetCanvas();

            Meteor.call('getCanvasForId', wallId, function (err, canvas) {
                if (err || !canvas) {
                    Alerts.set('Sorry, we couldn\'t find a wall with that id. A new canvas has been loaded instead.');
                    return startNewWall();
                }

                debugger;
                drawPointsOnCanvas(canvas.circlePoints);
                /*
                 (canvas.circlePoints || []).forEach(function (circlePoint) {
                 insertCircle(circlePoint.x, circlePoint.y, circlePoint.lineColor, true);
                 });
                 */
            });
        });
    });
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

