if (!d3.chart) {
  d3.chart = {};
}

d3.chart.lines = function() {
  var g,
      data,
      xExtent,
      yExtent,
      width = 400,
      height = width * (9/16);

  function chart(container) {
    g = container;
    g.append('g').classed('lines-x_axis', true)
    .attr('transform', 'translate(0, ' + height +')');
    g.append('g').classed('lines-y_axis', true);
    update();
  }

  chart.update = update;

  function update() {
    var graph = g.append('g').classed('graph', true)

    var xScale = d3.scale.linear()
      .domain(xExtent)
      .range([0, width])

    var yScale = d3.scale.linear()
      .domain(yExtent)
      .range([height, 0])

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')

    var xAxisGroup = g.select('.lines-x_axis')
    var yAxisGroup = g.select('.lines-y_axis')
    xAxis(xAxisGroup)
    yAxis(yAxisGroup)

    var line = d3.svg.line()
      .x(function(d) { return xScale(d.x); })
      .y(function(d) { return yScale(d.y); })

    graph
      .append('path').classed('graph-line', true)
      .attr('d', line(data))
      .on('mouseover', function(d) {
        d3.select(this).style('opacity', 1);
      })
      .on('mouseleave', function(d) {
        d3.select(this).style('opacity', .25);
      })

    graph.selectAll('graph-dot')
      .data(data)
      .enter()
      .append('circle').classed('graph-dot', true)
      .attr({
        r: 3.5,
        cx: function(d,i) { return xScale(d.x); },
        cy: function(d,i) { return yScale(d.y); }
      })
  }

  chart.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return chart;
  }

  chart.xExtent = function(value) {
    if (!arguments.length) return xExtent;
    xExtent = value;
    return chart;
  }

  chart.yExtent = function(value) {
    if (!arguments.length) return yExtent;
    yExtent = value;
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