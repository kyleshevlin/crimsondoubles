if (!d3.chart) {
  d3.chart = {};
}

d3.chart.table = function() {
  var div,
      data;

  function chart(container) {
    div = container;
    var table = container.append('table');
    var thead = table.append('thead').append('tr');
    thead.append('th').text('Class')
    thead.append('th').text('Map')
    thead.append('th').text('Partner')
    thead.append('th').text('Kills')
    thead.append('th').text('Assists')
    thead.append('th').text('K/D')
    thead.append('th').text('Ka/D')
    thead.append('th').text('W/L')
    thead.append('th').text('Score')

    update();
  }

  chart.update = update;

  function update() {
    var table = div.select('table');
    var rows = table.selectAll('tr.row')
      .data(data, function(d) { return d.id; })

    function killDeathRatio(kills, deaths) {
      deaths = deaths == 0 ? 1 : deaths;
      return (kills / deaths).toFixed(2);
    }

    function killAssistDeathRatio(kills, assists, deaths) {
      deaths = deaths == 0 ? 1 : deaths;
      return ((kills + assists) / deaths).toFixed(2);
    }

    var rowsEnter = rows.enter().append('tr').classed('row', true);

    rowsEnter.append('td').text(function(d) { return d.class; })
    rowsEnter.append('td').text(function(d) { return d.map; })
    rowsEnter.append('td').text(function(d) { return d.partner; })
    rowsEnter.append('td').text(function(d) { return d.kills; })
    rowsEnter.append('td').text(function(d) { return d.assists; })
    rowsEnter.append('td').text(function(d) {
      return killDeathRatio(d.kills, d.deaths);
    })
    rowsEnter.append('td').text(function(d) {
      return killAssistDeathRatio(d.kills, d.assists, d.deaths);
    })
    rowsEnter.append('td').text(function(d) { return d.score == 5 ? 'Win' : 'Loss'; })
    rowsEnter.append('td').text(function(d) { return d.score; })
  }

  chart.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return chart;
  }

  return chart;
}