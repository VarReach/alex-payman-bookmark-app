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

  function setExpandedId(id) {
    if (id !== this.expandedId) { 
      this.setEditing(false);
      this.expandedId = id;
    } else if (this.editing === false) {
      this.expandedId = null;
    }
  }

  function addNewBookmark(object) {
    this.bookmarks.push(object);
  }

  return {
    setAdded,
    addNewBookmark,
    setEditing,
    expandBookmark,
    setExpandedId,

    editing: false,
    expandedId: null,
    bookmarks: [],
    added: false,
    error: null,
    searchTerm: '',
    ratingFilter: 0
  };
})();
