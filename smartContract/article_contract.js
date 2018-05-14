"use strict";

var NArt = function() {
  LocalContractStorage.defineMapProperty(this, "votes");
  LocalContractStorage.defineMapProperty(this, "dislikes");
};

NArt.prototype = {
  init: function() {
    LocalContractStorage.put("items", []);
  },

  save: function(value) {
    value = value.trim();
    if (value === "") {
      throw new Error("empty key / value");
    }
    var items = LocalContractStorage.get("items");
    LocalContractStorage.put("items", items.concat([value]));
  },

  getAll: function() {
    var items = LocalContractStorage.get("items");
    return items;
  },

  vote: function(article_url) {
    var from = Blockchain.transaction.from;
    var key = article_url + from;
    var value = this.votes.get(key);
    if (value) {
      throw new Error("has vote");
    } else {
      this.votes.put(key, key);
      var items = LocalContractStorage.get("items");
      var newItems = [];
      for (var i = 0; i < items.length; i++) {
        var store_item = new ArticleItem(items[i]);
        if (store_item.article_url == article_url) {
          if (store_item.rank == undefined) {
            store_item.rank = 0;
          }
          store_item.rank++;
        }
        newItems.push(JSON.stringify(store_item));
        LocalContractStorage.put("items", newItems);
      }
      return JSON.stringify(newItems);
    }
  },
  dislike: function(article_url) {
    var from = Blockchain.transaction.from;
    var key = article_url + from;
    var value = this.dislikes.get(key);
    if (value) {
      throw new Error("has dislike");
    } else {
      this.votes.put(key, key);
      var items = LocalContractStorage.get("items");
      var newItems = [];
      for (var i = 0; i < items.length; i++) {
        var store_item = new ArticleItem(items[i]);
        if (store_item.article_url == article_url) {
          if (store_item.rank == undefined) {
            store_item.rank = 0;
          }
          store_item.rank--;
        }
        newItems.push(JSON.stringify(store_item));
        LocalContractStorage.put("items", newItems);
      }
      return JSON.stringify(newItems);
    }
  }
};

var ArticleItem = function(text) {
  if (text) {
    var obj = JSON.parse(text);
    this.article_url = obj.article_url;
    this.discover = obj.discover;
    this.article_desc = obj.article_desc;
    this.rank = obj.rank;
  } else {
    this.article_url = "";
    this.discover = "";
    this.article_desc = "";
    this.rank = 0;
  }
};
module.exports = NArt;
