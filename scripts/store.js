'use strict';
const store = (function () {
  function setAddForm(value) {
    this.addForm = value;
  }

  function deleteBookmark(id) {
    this.bookmarks = this.bookmarks.filter(element => element.id !== id);
    this.editing = false;
    this.expandedId = null;
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
    setAddForm,
    addNewBookmark,
    setEditing,
    expandBookmark,
    setExpandedId,
    deleteBookmark,
    editing: false,
    expandedId: null,
    bookmarks: [],
    addForm: false,
    error: null,
    searchTerm: '',
    ratingFilter: 0
  };
})();
