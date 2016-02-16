if (!d3.chart) {
  d3.chart = {};
}

d3.chart.pie = function() {
  var g,
      data,
      svg,
      pie,
      title = '',
      margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 500 - margin.left - margin.right,
      height = (width * 9/16),
      pieWidth = height,
      pieHeight = height,
      outerRadius = pieWidth / 2,
      innerRadius = pieWidth / 4,
      legendRectSize = 18,
      legendSpacing = 6;

  function chart(container) {
    g = container;
    update();
  }

  chart.update = update;

  function update() {
    var svg = g.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    pie = svg.append('g').classed('pie', true)
      .attr({
        width: pieWidth,
        height: pieHeight,
        transform: 'translate(' + margin.left + ',' + margin.top + ')'
      })

    var layout = d3.layout.pie()
      .value(function(d) { return d.value });

    var colorScale = d3.scale.category20();

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    // Set up groups
    var arcs = pie.selectAll("g.arc")
      .data(layout(data))
      .enter()
      .append("g").classed('arc', true)
      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    // Draw arc paths
    arcs
      .append("path")
      .attr("fill", function(d,i) { return colorScale(i); })
      .attr("d", arc)

    // Labels
    arcs
      .append("text")
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d, i) {
        return d.value;
      });

    var legend = svg.selectAll('.legend')
      .data(colorScale.domain())
      .enter()
      .append('g').classed('legend', true)
      .attr('transform', function(d,i) {
        var offset = legendRectSize + legendSpacing;
        return 'translate(' + (pieWidth + margin.left + margin.right) + ',' + ((offset * i) + margin.top) + ')';
      })

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', colorScale)
      .style('stroke', colorScale)

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - (legendSpacing / 2))
      .text(function(d,i) { return data[i].label; })

    var titleText = svg.append('text').classed('title', true)
    titleText
      .attr({
        x: (pieWidth + margin.left + margin.right) / 2,
        y: (pieHeight + margin.top + margin.bottom) / 2,
        'text-anchor': 'middle'
      })
      .text(title)
  }

  chart.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return chart;
  }

  chart.title = function(value) {
    if (!arguments.length) return title;
    title = value;
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

  chart.outerRadius = function(value) {
    if (!arguments.length) return outerRadius;
    outerRadius = value;
    return chart;
  }

  chart.innerRadius = function(value) {
    if (!arguments.length) return innerRadius;
    innerRadius = value;
    return chart;
  }

  return chart;
}
