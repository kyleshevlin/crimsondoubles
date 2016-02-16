if (!d3.chart) {
  d3.chart = {};
}

d3.chart.pie = function() {
  var g,
      data,
      width = 300,
      height = width;

  function chart(container) {
    g = container;
    update();
  }

  chart.update = update;

  function update() {
    var pie = g.append('g').classed('pie', true);
    var layout = d3.layout.pie()
      .value(function(d) { return d.value });
    var colorScale = d3.scale.category20();
    var outerRadius = width / 2;
    var innerRadius = 0;

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    // Set up groups
    var arcs = pie.selectAll("g.arc")
      .data( layout(data) )
      .enter()
      .append("g").classed('arc', true)
      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    // Draw arc paths
    arcs
      .append("path")
      .attr("fill", function(d, i) {
        return colorScale(i);
      })
      .attr("d", arc)
      .transition()

    // Labels
    arcs
      .append("text")
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d, i) {
        return data[i].label + ': ' + d.value;
      });
  }

  chart.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return chart;
  }

  chart.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return chart;
  }

  chart.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return chart;
  }

  return chart;
}
