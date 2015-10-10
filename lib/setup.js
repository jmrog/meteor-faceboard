if (Meteor.isClient) {
    Tracker.autorun(function() {
        Meteor.subscribe('circle-points');
    });

    function drawPointsOnCanvas(points, lineColor) {
        d3.select('#svgCanvasContainer svg')
            .selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cx', function(point) { return point.x; })
            .attr('cy', function(point) { return point.y; })
            .style('stroke', lineColor)
            .style('fill', lineColor);
    }

    Meteor.startup(function() {
        Tracker.autorun(function() {
            drawPointsOnCanvas(CirclePoints.find().fetch(), Session.get('lineColor'));
        });
    });
}

if (Meteor.isServer) {
    Meteor.publish('circle-points', function() {
        return CirclePoints.find();
    });
}
