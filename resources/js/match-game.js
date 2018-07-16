var MatchGame = {};

$(document).ready(function() {
  var $game = $('#game .row');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
  var i = 0
    , j = 0
    , temp = null

  for (i = cards.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = cards[i]
    cards[i] = cards[j]
    cards[j] = temp
  }
  return cards;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var hslValues = ['hsl(25,85%,65%)', 'hsl(55,85%,65%)', 'hsl(90,85%,65%)', 'hsl(160,85%,65%)',
                    'hsl(220,85%,65%)', 'hsl(265,85%,65%)', 'hsl(310,85%,65%)', 'hsl(360,85%,65%)'];
  $game.empty();
  var $card;
  var flipped = false;
  for(let i = 0; i < cardValues.length; i++) {
    let value = cardValues[i];
    let color = hslValues[value];
    let data = {
      value: value,
      color: color,
      isFlipped: false
    };
    $card = $('<div class="col-3 card"></div>');
    $card.data(data);
    $game.append($card);
  }
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
