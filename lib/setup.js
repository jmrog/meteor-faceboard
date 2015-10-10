if (Meteor.isClient) {
    Tracker.autorun(function() {
        Meteor.subscribe('circle-points');
    });

    function drawPointsOnCanvas(points) {
        d3.select('#svgCanvasContainer svg')
            .selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cx', function(point) { return point.x; })
            .attr('cy', function(point) { return point.y; })
            .style('stroke', 'black')
            .style('fill', 'black');
    }

    Meteor.startup(function() {
        d3.select('#svgCanvasContainer').append('svg').attr('width', 500).attr('height', 500);
        Session.set('svgCanvasContainerOffset', $('#svgCanvasContainer').offset());

        Tracker.autorun(function() {
            drawPointsOnCanvas(CirclePoints.find().fetch());
        });
    });
}

if (Meteor.isServer) {
    Meteor.publish('circle-points', function() {
        return CirclePoints.find();
    });
}
