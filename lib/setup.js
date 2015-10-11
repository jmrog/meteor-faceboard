if (Meteor.isClient) {
    Tracker.autorun(function() {
        Meteor.subscribe('circle-points');
        Meteor.subscribe('canvas');
    });

    function drawPointsOnCanvas(points) {
        // TODO: This is repeated code, and should be DRYed up.
        if (points.length < 1) {
            d3.select('#svgCanvasContainer svg').remove();
            d3.select('#svgCanvasContainer').append('svg').attr('width', 500).attr('height', 500);
            Session.set('svgCanvasContainerOffset', $('#svgCanvasContainer').offset());
            Session.set('lineColor', 'black');
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

    Meteor.startup(function() {
        Tracker.autorun(function() {
            drawPointsOnCanvas(CirclePoints.find().fetch());
        });
    });
}

if (Meteor.isServer) {
    Meteor.publish('circle-points', function() {
        return CirclePoints.find();
    });
    Meteor.publish('canvas', function() {
        return Canvas.find();
    });
}
