d3.json('matches.json', function(err, matches) {
  var data = matches.matches;
  var overviewDisplay = d3.select('.js-overview-display')
  var fullStatsDisplay = d3.select('.js-full-stats-display');

  // Overview Table
  var overviewDiv = overviewDisplay.append('div').classed('overview-table-wrap', true);
  var overviewTable = d3.chart.table();
  overviewTable
    .data(data)
    .columns([])
    .dataFunctions({})
  overviewTable(overviewDiv);

  // Full Stats Table
  var fullStatsDiv = fullStatsDisplay.append('div').classed('full_stats-table-wrap', true);
  var fullStatsTable = d3.chart.table();
  fullStatsTable
    .data(data)
    .columns(['Class','Map','Partner','Kills','Assists','K/D','Ka/D','W/L','Score'])
    .dataFunctions({
      0: function(d) { return d.class; },
      1: function(d) { return d.map; },
      2: function(d) { return d.partner; },
      3: function(d) { return d.kills; },
      4: function(d) { return d.assists; },
      5: function(d) { return killDeathRatio(d.kills, d.deaths).toFixed(2); },
      6: function(d) { return killAssistDeathRatio(d.kills, d.assists, d.deaths).toFixed(2); },
      7: function(d) { return d.score == 5 ? 'Win' : 'Loss'; },
      8: function(d) { return d.score; }
    })
  fullStatsTable(fullStatsDiv);

  // Wins Losses Pie Chart
  var winsLossesGroup = fullStatsDisplay.append('div').classed('pie-wrap', true);
  var winsLossesPie = d3.chart.pie()
    .data(_winsLosses(data))
    .title('Wins & Losses')
  winsLossesPie(winsLossesGroup);

  // Matches Per Class Pie Chart
  var matchesPerClassGroup = fullStatsDisplay.append('div').classed('pie-wrap', true)
  var matchesPerClassPie = d3.chart.pie()
    .data(_matchesPerClass(data))
    .title('Matches/Class')
  matchesPerClassPie(matchesPerClassGroup);

  // Matches Per Partner Pie Chart
  var matchesPerPartnerGroup = fullStatsDisplay.append('div').classed('pie-wrap', true);
  var matchesPerPartnerPie = d3.chart.pie()
    .data(_matchesPerPartner(data))
    .title('Matches/Partner')
  matchesPerPartnerPie(matchesPerPartnerGroup);

  // Matches Per Map Pie chart
  var matchesPerMapGroup = fullStatsDisplay.append('div').classed('pie-wrap', true);
  var matchesPerMapPie = d3.chart.pie()
    .data(_matchesPerMap(data))
    .title('Matches/Map')
  matchesPerMapPie(matchesPerMapGroup);

  // Kills Line Chart
  var killsGroup = fullStatsDisplay.append('div').classed('lines-wrap', true);
  var killLines = d3.chart.lines()
    .data(_kills(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.kills; }))
  killLines(killsGroup);

  // Assists Line Chart
  var assistsGroup = fullStatsDisplay.append('div').classed('lines-wrap', true);
  var assistsLines = d3.chart.lines()
    .data(_assists(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.assists; }))
  assistsLines(assistsGroup);

  // Deaths Line Chart
  var deathsGroup = fullStatsDisplay.append('div').classed('lines-wrap', true);
  var deathsLines = d3.chart.lines()
    .data(_deaths(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.deaths; }))
  deathsLines(deathsGroup);

  // Kill/Death Ratio Line Chart
  var killDeathsGroup = fullStatsDisplay.append('div').classed('lines-wrap', true);
  var killDeathsLines = d3.chart.lines()
    .data(_killDeathRatio(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return killDeathRatio(d.kills, d.deaths); }))
  killDeathsLines(killDeathsGroup);

  // Kill+Assists/Death Ratio Line Chart
  var killAssistDeathsGroup = fullStatsDisplay.append('div').classed('lines-wrap', true);
  var killAssistDeathsLines = d3.chart.lines()
    .data(_killAssistDeathRatio(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return killAssistDeathRatio(d.kills, d.assists, d.deaths); }))
  killAssistDeathsLines(killAssistDeathsGroup);

  // Scores
  var scoresGroup = fullStatsDisplay.append('div').classed('lines-wrap', true)
  var scoresLines = d3.chart.lines()
    .data(_scores(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.score; }))
  scoresLines(scoresGroup);
});
