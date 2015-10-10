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
        // TODO: Responsive?
        d3.select('#svgCanvasContainer').append('svg').attr('width', 500).attr('height', 500);
        Session.set('svgCanvasContainerOffset', $('#svgCanvasContainer').offset());
        Session.set('lineColor', 'black');

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
