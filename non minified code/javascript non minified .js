$(document).ready(function () {
  setInterval(enemyanimation, 1000);
  $('#helpclose').on('click', function () {
    $('#helpmessage').slideUp(500);
    $('#defocus').fadeOut(500);
  });
  $('.exitbutton').on('click', function () {
    $('#splashpage').show();
    $('#finalbutton').show();
    $('#startdiv').show();
    $('#defocus').show();
    $('#playbutton').show();
    $('#home').show();
    $('#firstheader').show();
  });
  $('#playbutton').on('click', function () {
    $('#startdiv').slideUp(500);
    $('#defocus').fadeOut(500);
    $('#playbutton').slideUp(100);
    $('#character').fadeIn(1500);
    $('.enemy').show();
    $('p').show();
  });
  $('.answerbuttons').on('click', function () {
    $('#defocus').fadeIn(300);
  });
  $('.retrybutton').on('click', function () {
    $('#defocus').fadeOut(200);
    $('.wronganswer').fadeOut(200);
  });
  $('.newqbutton').on('click', function () {
    $('#defocus').fadeOut(200);
    $('#character').animate({
      bottom: '55%'
    }, 1500, function () {
    }).animate({
      bottom: '10%'
    }, 1500, function () {
    });
    $('.answerbuttons').fadeOut(200).delay(2800).fadeIn(400);
    $('#page2 > div:nth-child(1)').fadeOut(200).delay(2800).fadeIn(400);
    $('#page1 > div:nth-child(1)').fadeOut(200).delay(2800).fadeIn(400);
    $('.rightanswer').fadeOut(200);
    $('#character').attr('src', 'images/player2.png');
  });
  $('#finishbutton').on('click', function () {
    $('#endofgame').fadeOut(200);
    $('#startdiv').fadeIn(200);
    $('#playbutton').fadeIn(200);
    $('#home').show();
    $('#character').fadeOut(100);
    $('#defocus').fadeIn(200);
    $('#startdiv > p:nth-child(1)').show();
    $('#home > p').show();
  });
});
var current = - 1;
var currentanswerbuttons = - 4;
var answer = - 1;
var questionsanswered = - 1;
var difficulty = 1;
var currentquestion = 1;
function checkquestion(x)
{
  var chosenanswer = x.innerHTML;
  if (chosenanswer != answer)
  {
    $(document).ready(function () {
      $('.wronganswer').fadeIn(300);
    });
    wrongsound();
  } 
  else
  {
    $(document).ready(function () {
      $('.rightanswer').fadeIn(300);
    });
    correctsound();
  }
}
var backgroundx = 0;
function newquestion()
{
  document.getElementsByClassName('steps') [0].innerHTML = 'Q. ' + currentquestion + ' of 10';
  document.getElementsByClassName('steps') [1].innerHTML = 'Q. ' + currentquestion + ' of 10';
  currentquestion++;
  $('html').animate({
    backgroundPositionX: '-=70px'
  }, 3000);
  if (questionsanswered === 4)
  {
    finishsound();
    $(document).ready(function () {
      $('#endofgame').show();
      $('#character').hide();
      $('.enemy').hide();
      $('p').hide();
    });
  } 
  else
  {
    questionsanswered++;
    current++;
    currentanswerbuttons += 4;
    current %= 2;
    currentanswerbuttons %= 8;
    console.log('current:  ' + current + '  currentanswerbuttons:  ' + currentanswerbuttons + '  questionsanswered:  ' + questionsanswered);
    var r1 = (Math.floor((Math.random() * 10))) * difficulty;
    var r2 = (Math.floor((Math.random() * 10))) * difficulty;
    var x = document.getElementsByClassName('question');
    var x2 = document.getElementsByClassName('answerbuttons');
    var r = Math.random();
    if (r < 0.5)
    {
      x[current].innerHTML = r1 + ' + ' + r2 + ' = ...';
      answer = r1 + r2;
      firstnumber = r1;
      secondnumber = r2;
      operator = 0;
    } 
    else
    {
      if (r1 < r2)
      {
        x[current].innerHTML = r2 + ' - ' + r1 + ' = ...';
        answer = r2 - r1;
        firstnumber = r2;
        secondnumber = r1;
        operator = 1;
      } 
      else
      {
        x[current].innerHTML = r1 + ' - ' + r2 + ' = ...';
        answer = r1 - r2;
        firstnumber = r1;
        secondnumber = r2;
        operator = 1;
      }
    }
    var answerpos = Math.floor((Math.random() * 4));
    x2[currentanswerbuttons + answerpos].innerHTML = answer;
    var i;
    for (i = currentanswerbuttons; i < currentanswerbuttons + 4 && i < x2.length; i++)
    {
      if (i != currentanswerbuttons + answerpos) x2[i].innerHTML = generateAnswers(x2);
    }
  }
  setTimeout(function () {
    document.getElementById('character').setAttribute('src', 'images/player1.png')
  }, 2900);
}
function generateAnswers(x)
{
  var a1 = x[currentanswerbuttons].innerHTML;
  var a2 = x[currentanswerbuttons + 1].innerHTML;
  var a3 = x[currentanswerbuttons + 2].innerHTML;
  var a4 = x[currentanswerbuttons + 3].innerHTML;
  var n = (Math.floor((Math.random() * 20))) * difficulty;
  if (n != a1 && n != a2 && n != a3 && n != a4) return n;
   else return generateAnswers(x);
}
function resetvars()
{
  current = - 1;
  currentanswerbuttons = - 4;
  answer = - 1;
  questionsanswered = - 1;
  currentquestion = 1;
}
function chosedifficulty(x) //this.
{
  $(document).ready(function () {
    $('#home').slideUp(1000);
  });
  var d = x.innerHTML;
  if (d === 'Easy')
  {
    difficulty = 1;
  } 
  else if (d === 'Medium')
  {
    difficulty = 2;
  } 
  else difficulty = 3;
}
function play()
{
  $('#splashpage').slideUp(1000);
  $('#finalbutton').slideUp(400);
  $('#firstheader').fadeOut(400);
}
var firstnumber;
var secondnumber;
var operator;
function showhelpmessage()
{
  $('#defocus').fadeIn(500);
  $('#helpmessage').slideDown(500);
  if (operator == 0)
  {
    $('#helpmessage > p:nth-child(1)').html('If you have ' + firstnumber + ' marbles in one hand and ' + secondnumber + ' marbles in the other hand, how many marbles do you have all together? Pick an answer.');
  } 
  else
  {
    $('#helpmessage > p:nth-child(1)').html('If you have ' + (firstnumber) + ' marbles in a bag and you take ' + secondnumber + ' marbles out of the bag, how many marbles are left in the bag? Pick an answer.');
  }
}
function intromusic()
{
  var intromusic = document.getElementById('intromusic');
  intromusic.play();
}
function buttonsound()
{
  var buttonsound = document.getElementById('buttonsound');
  buttonsound.play();
}
function finishsound()
{
  var finishsound = document.getElementById('finishsound');
  finishsound.play();
}
function wrongsound()
{
  var wrongsound = document.getElementById('wrongsound');
  wrongsound.play();
}
function correctsound()
{
  var correctsound = document.getElementById('correctsound');
  correctsound.play();
}
function enemyanimation() {
  var currpic = document.getElementsByClassName('baddy') [0].getAttribute('src');
  if (currpic == 'images/Picture1.png')
  {
    document.getElementsByClassName('baddy') [0].setAttribute('src', 'images/Picture2.png');
    document.getElementsByClassName('baddy') [1].setAttribute('src', 'images/Picture2.png');
  } 
  else
  {
    document.getElementsByClassName('baddy') [0].setAttribute('src', 'images/Picture1.png');
    document.getElementsByClassName('baddy') [1].setAttribute('src', 'images/Picture1.png');
  }
}
// 