/* global store, $, api */

'use strict';

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => (o[name] = val));
    return JSON.stringify(o);
  }
});

function render() {
  if (store.added) {
    $('.js-add-new-form').removeClass('hidden');
  } else {
    $('.js-add-new-form').addClass('hidden');
  }

  //grab items
}

function handleDeleteBookmark() {
  $('.js-delete-entry ').click(function(event) {
    //getid via jquery
    //api call
    //promise statement handles deleting from store
  });
}

function handleEditSubmitBookmark() {
  store.setEditing(true);
}

function handleEditCancelBookmark() {
  $('.js-confirm-edit').click(function(event) {
    //getid via jquery
    store.setEditing(false);
  });
}

function handleAddNewBookmark() {
  $('#js-add-new-button').click(function(event) {
    //disable click new
    store.setAdded(true);
    render();
  });
}

function handleCancelNewBookmark() {
  $('#js-add-new-cancel').click(function(event) {
    store.setAdded(false);
    render();
  });
}

function handleSubmitNewBoomkark() {
  $('.js-add-new-form').submit(function(event) {
    //grabFormValues
    event.preventDefault();
    const obj = $('.js-add-new-form').serializeJson();

    api
      .createItem(obj)
      .then(data => {
        store.addNewBookmark(data);
        render();
      })
      .catch(error => {
        //handle error
      });

    //promise statement
    /*store.addNewBoomkark();
    render();

    //catch
    store.setError();
    render();*/
  });
}

function initializeBookmarkApp() {
  handleAddNewBookmark();
  handleSubmitNewBoomkark();
  handleCancelNewBookmark();
  handleDeleteBookmark();
  handleEditSubmitBookmark();
  handleEditCancelBookmark();
}

$(initializeBookmarkApp);
