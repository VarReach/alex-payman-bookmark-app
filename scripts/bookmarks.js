'use strict';

/* global store */

const bm = (function() {

  function generateBookmarkHTML(bookmark) {
    const expandedId = store.expandedId;
    //Expanded View
    if (bookmark.id === expandedId) {
      return `
        <li class="bookmark-entry expanded" data-item-id="${bookmark.id}">
          <div class="js-bookmark-entry">
            <img src="" alt="website Icon" class="bookmark-icon">
            <span class="js-website-name website-name">${bookmark.title}</span>
            <span class="js-website-url website-url">${bookmark.url}</span>
            <div class="star-rating js-star-rating">
                <span>${bookmark.rating}</span>
            </div>
          </div>
          <label for="js-edit-entry edit-entry" class="tooltip">
            <button type="submit" class="js-edit-entry-button"><i class="fa-icons fa-pencil"></i>Edit</button>
          </label>
          <div class="description-entry js-description-entry">${bookmark.desc}</div>
          <span class="js-delete-entry delete-entry"><i class="fa-icons fa-trashcan"></i></span>
          <span class="visit-entry-url js-visit-entry-url"><a href="https://google.com">Visit Site</a></span>
        </li>
      `;
    }
    //Default/Condensed View
    return `<li class="js-bookmark-entry bookmark-entry condensed" data-item-id="${bookmark.id}">
        <img src="" alt="website Icon" class="bookmark-icon">
        <span class="js-website-name website-name">${bookmark.title}</span>
        <span class="js-website-url website-url">${bookmark.url}</span>
        <div class="star-rating js-star-rating">
          <span>${bookmark.rating}</span>
        </div>
    </li>`;
  }

  function generateBookmarksString(bookmarks) {
    const items = bookmarks.map(item => generateBookmarkHTML(item));
    return items.join('');
  }


  function render() {
    let items = [...store.bookmarks];

    if (store.added) {
      $('.js-add-new-form').removeClass('hidden');
    } else {
      $('.js-add-new-form').addClass('hidden');
    }

    //search filter

    //rating filter

    //error

    //render the bookmarks
    const bookmarksString = generateBookmarksString(items);
    $('#js-bookmarks').html(bookmarksString);
  }

  function handleClickOnBookmark() {
    $('#js-bookmarks').on('click', '.js-bookmark-entry', event => {
      const liItem = $(event.currentTarget);
      const id = liItem.data('item-id');
      store.setExpandedId(id);
      render();
    });
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

  function bindEventListeners() {
    handleAddNewBookmark();
    handleSubmitNewBoomkark();
    handleCancelNewBookmark();
    handleDeleteBookmark();
    handleEditSubmitBookmark();
    handleEditCancelBookmark();
    handleClickOnBookmark()
  }

  return {render, bindEventListeners}
}());