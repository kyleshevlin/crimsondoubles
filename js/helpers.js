/*
 * Helper Functions
 * Available to all scripts called after this file
**/

// Win?
function wasWin(score) {
  return score == 5;
}

// Win Percentage
function winPercentage(wins, games) {
  games = games == 0 ? 1 : games;
  return ((wins / games) * 100).toFixed(2) + '%';
}

// Kill/Death Ratio
function killDeathRatio(kills, deaths) {
  deaths = deaths == 0 ? 1 : deaths;
  return parseFloat((kills / deaths).toFixed(2));
}

// Kill+Assist/Death Ratio
function killAssistDeathRatio(kills, assists, deaths) {
  deaths = deaths == 0 ? 1 : deaths;
  return parseFloat(((kills + assists) / deaths).toFixed(2));
}

// Kill/Game Ratio
function killGameRatio(kills, games) {
  games = games == 0 ? 1 : games;
  return parseFloat((kills / games).toFixed(2));
}

// Assist/Game Ratio
function assistGameRatio(assists, games) {
  games = games == 0 ? 1 : games;
  return parseFloat((assists / games).toFixed(2));
}

// Death/Game Ratio
function deathGameRatio(deaths, games) {
  games = games == 0 ? 1 : games;
  return parseFloat((deaths / games).toFixed(2));
}
