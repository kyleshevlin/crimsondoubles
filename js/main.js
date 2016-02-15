d3.json('matches.json', function(err, matches) {
  var data = matches.matches;
  var display = d3.select('.js-display');
  var svg = d3.select('svg');

  // Table
  var tdiv = display.append('div').classed('table-wrap', true);
  var table = d3.chart.table();
  table.data(data);
  table(tdiv);

  // Wins Losses Pie Chart
  var winsLossesGroup = svg.append('g').classed('win_loss_pie-group', true);
  var winsLossesPie = d3.chart.pie()
    .data(_winsLosses(data))
    .width(200);
  winsLossesPie(winsLossesGroup);

  // Matches Per Class Pie Chart
  var matchesPerClassGroup = svg.append('g').classed('matches_per_class_pie-group', true)
  matchesPerClassGroup.attr('transform', 'translate(220, 0)')
  var matchesPerClassPie = d3.chart.pie()
    .data(_matchesPerClass(data))
    .width(200);
  matchesPerClassPie(matchesPerClassGroup);

  // Matches Per Partner Pie Chart
  var matchesPerPartnerGroup = svg.append('g').classed('matches_per_partner_pie-group', true);
  matchesPerPartnerGroup.attr('transform', 'translate(440, 0)')
  var matchesPerPartnerPie = d3.chart.pie()
    .data(_matchesPerPartner(data))
    .width(200)
  matchesPerPartnerPie(matchesPerPartnerGroup);

  // Mathces Per Map Pie chart
  var matchesPerMapGroup = svg.append('g').classed('matches_per_map_pie-group', true);
  matchesPerMapGroup.attr('transform', 'translate(660, 0)')
  var matchesPerMapPie = d3.chart.pie()
    .data(_matchesPerMap(data))
    .width(200)
  matchesPerMapPie(matchesPerMapGroup);

  // Kills Line Chart
  var killsGroup = svg.append('g').classed('kills-lines-group', true);
  killsGroup.attr('transform', 'translate(30, 220)')
  var killLines = d3.chart.lines()
    .data(_kills(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.kills; }))
  killLines(killsGroup);

  // Assists Line Chart
  var assistsGroup = svg.append('g').classed('assists-lines-group', true);
  assistsGroup.attr('transform', 'translate(480, 220)')
  var assistsLines = d3.chart.lines()
    .data(_assists(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.assists; }))
  assistsLines(assistsGroup);

  // Deaths Line Chart
  var deathsGroup = svg.append('g').classed('deaths-lines-group', true);
  deathsGroup.attr('transform', 'translate(30, 480)')
  var deathsLines = d3.chart.lines()
    .data(_deaths(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.deaths; }))
  deathsLines(deathsGroup);

  // Kill/Death Ratio Line Chart
  var killDeathsGroup = svg.append('g').classed('kill_deaths-lines-group', true);
  killDeathsGroup.attr('transform', 'translate(480, 480)')
  var killDeathsLines = d3.chart.lines()
    .data(_killDeathRatio(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return killDeathRatio(d.kills, d.deaths); }))
  killDeathsLines(killDeathsGroup);

  // Kill+Assists/Death Ratio Line Chart
  var killAssistDeathsGroup = svg.append('g').classed('kill_assists_deaths-lines-group', true);
  killAssistDeathsGroup.attr('transform', 'translate(30, 740)')
  var killAssistDeathsLines = d3.chart.lines()
    .data(_killAssistDeathRatio(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return killAssistDeathRatio(d.kills, d.assists, d.deaths); }))
  killAssistDeathsLines(killAssistDeathsGroup);
});
