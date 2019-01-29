'use strict';
const store = (function() {
  function setAdded(value) {
    this.added = value;
  }

  function expandBookmark(id) {
    const obj = findById(id);
    //set epxnaded
  }

  function findById(id) {
    //find element in array by id
  }

  function setEditing(value) {
    this.editing = value;
    //set to true
  }

  function addNewBookmark(...args) {
    const newBookmark = {
      id: args[0],
      name: args[1],
      description: args[2],
      rating: args[3],
      url: args[4]
    };

    this.bookmarks.push(newBookmark);
  }

  return {
    setAdded,
    addNewBookmark,
    editBookmark,
    expandBookmark,
    editing: false,
    expandedId: null,
    bookmarks: [],
    added: false,
    error: null,
    searchTerm: '',
    ratingFilter: 0
  };
})();
