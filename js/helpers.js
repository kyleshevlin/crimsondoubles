/*
 * Helper Functions
 * Available to all scripts called after this file
**/

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