"use strict";

$(document).ready(function () {
  var obj = {
    data: {
      uuid: '24929ac2-65a9-4291-a9e2-36db27d3f820',
      apiPath: 'https://course-ec-api.hexschool.io/',
      products: []
    },
    //先取得資料
    getData: function getData() {
      var _this = this;

      var api = "".concat(this.data.apiPath, "api/").concat(this.data.uuid, "/ec/products");
      axios.get(api).then(function (res) {
        _this.data.products = res.data.data;

        _this.render();
      })["catch"](function (err) {
        console.log(err);
      });
    },
    render: function render() {
      var productsList = document.getElementById('list-item'); // 取得商品列表的區塊

      var products = this.data.products; // 取得 getData 資料 

      var str = ''; // 設置一個空字串

      var productCount = document.getElementById('productCount');
      products.forEach(function (item) {
        str += "\n        <div class=\"col-md-4 mb-3\">\n          <div class=\"card d-flex h-100\">\n              <img src=\"".concat(item.imageUrl, "\"\n                  class=\"pb-2\" alt=\"...\">\n              <div class=\"card-body d-flex flex-column\">\n                <h3 class=\"text-primary\">").concat(item.title, "</h3>\n                <p>").concat(item.content, "</p>\n                <div class=\"d-flex mt-auto\">\n                  <del class=\"mr-auto\">NT$").concat(item.origin_price, "</del>\n                  <p class=\"text-danger font-weight-bold\">NT$").concat(item.price, "</p>\n                </div>\n                <div class=\"d-flex justify-content-end\">\n                  <a class=\"btn btn-outline-primary\"><i class=\"fas fa-shopping-cart mr-1\"></i>\u52A0\u5165\u8CFC\u7269\u8ECA</a>\n                </div>\n                <span class=\"onsale\">On Sale</span>\n              </div>\n            </div>\n          </div>\n        ");
      });
      productCount.innerHTML = products.length;
      productsList.innerHTML = str; //隱藏loading...

      document.querySelector('.loading-background').style = "display:none !important";
    }
  };
  obj.getData();
});
//# sourceMappingURL=all.js.map
