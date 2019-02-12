$(document).ready(function() {

  $('form').submit(function (event) {
    event.preventDefault();
    var $searchTerm = $('#search');
    var $searchButton = $('#submit');

    $searchTerm.prop('disabled', true);
    $searchButton.attr('disabled', true).val('Loading...');

    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = $searchTerm.val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);

      $searchTerm.prop('disabled', false);
      $searchButton.attr('disabled', false).val('Search');
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

}); // end ready
