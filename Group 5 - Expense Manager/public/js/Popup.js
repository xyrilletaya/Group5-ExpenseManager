$(document).ready(function () {
  $(".Click-here").on('click', function () {
    $(".custom-model-main").addClass('model-open');
  });
  $(".close-btn, .bg-overlay").click(function () {
    $(".custom-model-main").removeClass('model-open');
  });

});

$(document).ready(function () {
  $(".Click-here1").on('click', function () {
    $(".custom-model-main1").addClass('model-open1');
  });
  $(".close-btn1, .bg-overlay1").click(function () {
    $(".custom-model-main1").removeClass('model-open1');
  });

});