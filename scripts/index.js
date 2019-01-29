/* global store, $, api */

'use strict';
function render() {
  if (store.added) {
    //show form
  } else {
    //set form to hidden
  }
}

function handleDeleteBookmark() {
  $('.js-delete-entry ').click(function(event) {
    //getid via jquery
    //api call
    //promise statement handles deleting from store
  });
}

function handleEditSubmitBookmark() {
  store.setEdited(true);
}

function handleEditCancelBookmark() {
  $('.js-confirm-edit').click(function(event) {
    //getid via jquery
    store.setEdited(false);
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
  $('#js-add-new-form').submit(function(event) {
    //grabFormValues
    let formValues = '';

    //api call

    //promise statement
    store.addNewBoomkark();
    render();

    //catch
    store.setError();
    render();
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
