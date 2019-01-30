'use strict';

/* global store, api */

const bm = (function () {

  function editTemplate(bookmark) {
    return `
    <li data-item-id="${bookmark.id}" class="js-bookmark-entry bookmark-entry expanded">
      <form class="js-bookmark-edit-form">
        <div class="js-bookmark-header-edit bookmark-header-edit">
          <img src="" alt="website Icon" class="bookmark-icon">
          <input value="${bookmark.title}" name="title" class="js-website-name-edit website-name-edit">
          <input value="${bookmark.url}" name="url" class="js-website-url-edit website-url-edit">
          <div class="star-rating js-star-rating">
              <span><input type="radio" name="rating" id="star-5" value="5"><label for="star-5"></label></span>
              <span><input type="radio" name="rating" id="star-4" value="4"><label for="star-4"></label></span>
              <span><input type="radio" name="rating" id="star-3" value="3"><label for="star-3"></label></span>
              <span><input type="radio" name="rating" id="star-2" value="2"><label for="star-2"></label></span>
              <span><input type="radio" name="rating" id="star-1" value="1"><label for="star-1"></label></span>
          </div>
        </div>
        <ul class="edit-buttons js-edit-buttons">
          <label for="js-confirm-edit" class="tooltip">
              <button type="submit" class="js-confirm-edit confirm-edit"><i class="fa-icon fa-icon-check"></i>Submit</button>
          </label>
          <label for="js-cancel-edit" class="tooltip">
              <button type="reset" class="js-cancel-edit cancel-edit"><i class="fa-icons tooltip-button"></i>Cancel</button>
          </label>
        </ul>
        <textarea class="edit-description-entry js-edit-description-entry" name="desc" >${bookmark.desc}</textarea>
        <button class="js-delete-entry delete-entry"><i class="fa-icons fa-trashcan"></i>Delete</button>
        <button class="visit-entry-url js-visit-entry-url"><a href="${bookmark.url}">Visit Site</a></button>
      </form>
    </li>`;
  }

  function expandedTemplate(bookmark) {
    return `
          <li class="js-bookmark-entry bookmark-entry expanded" data-item-id="${bookmark.id}">
            <div class="js-bookmark-header bookmark-header">
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
            <button class="js-delete-entry delete-entry"><i class="fa-icons fa-trashcan"></i>Delete</button>
            <button class="visit-entry-url js-visit-entry-url"><a target="_blank" href="${bookmark.url}">Visit Site</a></button>
        </li>
        `;
  }

  function defaultTemplate(bookmark) {
    return `
        <li class="js-bookmark-entry bookmark-entry condensed" data-item-id="${bookmark.id}">
          <div class="js-bookmark-header bookmark-header">
            <img src="" alt="website Icon" class="bookmark-icon">
            <span class="js-website-name website-name">${bookmark.title}</span>
            <span class="js-website-url website-url">${bookmark.url}</span>
            <div class="star-rating js-star-rating">
              <span>${bookmark.rating}</span>
            </div>
          </div
        </li>`;
  }

  function generateBookmarkHTML(bookmark) {
    const expandedId = store.expandedId;
    //Expanded View
    if (bookmark.id === expandedId) {
      if (store.editing) {
        return editTemplate(bookmark);
      }
      return expandedTemplate(bookmark);
    }
    //Default/Condensed View
    return defaultTemplate(bookmark);
  }

  function generateBookmarksString(bookmarks) {
    const items = bookmarks.map(item => generateBookmarkHTML(item));
    return items.join('');
  }

  function render() {
    let items = [...store.bookmarks];

    if (store.addForm) {
      $('.js-add-new-form').removeClass('hidden');
    } else {
      $('.js-add-new-form').addClass('hidden');
    }

    //search filter

    //rating filter
    const ratingFilter = store.ratingFilter;
    if (ratingFilter >= 1) {
      items = items.filter(item => item.rating && item.rating >= ratingFilter);
    }
    //error

    //render the bookmarks
    const bookmarksString = generateBookmarksString(items);
    $('#js-bookmarks').html(bookmarksString);
  }

  function handleRatingsFilter() {
    $('#js-filter-by-rating-entry').change(event => {
      const ratingToFilter = $('#js-filter-by-rating-entry').val();
      store.updateRatingsFilter(ratingToFilter);
      render();
    });
  }

  function handleClickOnBookmark() {
    $('#js-bookmarks').on('click', '.js-bookmark-header', event => {
      const liItem = $(event.currentTarget).parent();
      const id = liItem.data('item-id');
      store.setExpandedId(id);
      render();
    });
  }

  function handleDeleteBookmark() {
    $('#js-bookmarks').on('click', '.js-delete-entry', function (event) {
      const id = $(event.currentTarget).closest('li').data('item-id');
      api
        .deleteItem(id)
        .then(() => {
          store.deleteBookmark(id);
          render();
        })
        .catch(error => {
          //handle error
        });
    });

  }

  function handleClickEditBookmark() {
    $('#js-bookmarks').on('click', '.js-edit-entry-button', function (event) {
      store.setEditing(true);
      render();
    });
  }

  function handleEditSubmitBookmark() {
    $('#js-bookmarks').on('submit', '.js-bookmark-edit-form', function (event) {
      //grabFormValues
      event.preventDefault();
      const obj = $('.js-bookmark-edit-form').serializeJson();
      const id = $(event.currentTarget).parent().data('item-id');

      api
        .editItem(obj, id)
        .then(() => {
          store.editBookmark(obj, id);
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

  function handleEditCancelBookmark() {
    $('#js-bookmarks').on('reset', '.js-bookmark-edit-form', function(event) {
      store.setEditing(false);
      render();
    });
  }

  function handleAddNewBookmark() {
    $('#js-add-new-button').click(function (event) {
      //disable click new
      store.setAddForm(true);
      render();
    });
  }

  function handleCancelNewBookmark() {
    $('#js-add-new-cancel').click(function (event) {
      store.setAddForm(false);
      render();
    });
  }

  function handleSubmitNewBoomkark() {
    $('.js-add-new-form').submit(function (event) {
      //grabFormValues
      event.preventDefault();
      const obj = $('.js-add-new-form').serializeJson();

      api
        .createItem(obj)
        .then(data => {
          store.addNewBookmark(data);
          store.setAddForm(false);
          $('.js-add-new-form').trigger('reset');
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
    handleClickEditBookmark();
    handleEditSubmitBookmark();
    handleEditCancelBookmark();
    handleRatingsFilter();
    handleClickOnBookmark();
  }

  return { render, bindEventListeners };
})();
