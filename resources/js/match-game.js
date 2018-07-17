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
  for (let i = 0; i < cards.length; i++) {
    let j = Math.floor(Math.random() * (cards.length - i));
    let temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
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
  $game.data('flippedCards', []);

  for(let i = 0; i < cardValues.length; i++) {
    let value = cardValues[i];
    let color = hslValues[value - 1];
    let data = {
      value: value,
      color: color,
      isFlipped: false
    };
    var $card = $('<div class="col-3 card"></div>');
    $card.data(data);
    $game.append($card);
  }
  $('.card').click(function () {
    MatchGame.flipCard($(this), $game);
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

    var flippedCards = $game.data('flippedCards');

    if($card.data('isFlipped')) {
      return;
    }
    else {
      $card.css('background-color', $card.data('color'));
      $card.append('<p> ' + $card.data('value') + ' </p>');
      $card.data('isFlipped', true);

      flippedCards.push($card);
    }

    /** Check if current flipped card matches a previous flipped card **/
    if (flippedCards.length === 2) {
        if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
          var matchCss = {
            backgroundColor: 'rgb(153, 153, 153)',
            color: 'rgb(204, 204, 204)'
          };
          flippedCards[0].css(matchCss);
          flippedCards[1].css(matchCss);
        }
        else {
          var card1 = flippedCards[0];
          var card2 = flippedCards[1];
          window.setTimeout(function () {
            card1.css('background-color', 'rgb(32,64,86)')
                  .empty()
                  .data('isFlipped', false);
            card2.css('background-color', 'rgb(32,64,86)')
                  .empty()
                  .data('isFlipped', false);
          }, 350);


        }
        $game.data('flippedCards', []);
    }
};
