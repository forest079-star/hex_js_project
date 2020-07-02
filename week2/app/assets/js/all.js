$(document).ready(() => {

  var obj = {
    data: {
      uuid: '24929ac2-65a9-4291-a9e2-36db27d3f820',
      apiPath: 'https://course-ec-api.hexschool.io/',
      products: [],
    },

    //先取得資料
    getData() {
      var api = `${this.data.apiPath}api/${this.data.uuid}/ec/products`;

      axios.get(api)
        .then((res) => {
          this.data.products = res.data.data;
          this.render();

        })
        .catch((err) => {
          console.log(err);

        })
    },


    render() {

      var productsList = document.getElementById('list-item'); // 取得商品列表的區塊
      var products = this.data.products; // 取得 getData 資料 
      var str = ''; // 設置一個空字串
      var productCount = document.getElementById('productCount');

      products.forEach(item => {
        str += `
        <div class="col-md-4 mb-3">
          <div class="card d-flex h-100">
              <img src="${item.imageUrl}"
                  class="pb-2" alt="...">
              <div class="card-body d-flex flex-column">
                <h3 class="text-primary">${item.title}</h3>
                <p>${item.content}</p>
                <div class="d-flex mt-auto">
                  <del class="mr-auto">NT$${ item.origin_price }</del>
                  <p class="text-danger font-weight-bold">NT$${ item.price }</p>
                </div>
                <div class="d-flex justify-content-end">
                  <a class="btn btn-outline-primary"><i class="fas fa-shopping-cart mr-1"></i>加入購物車</a>
                </div>
                <span class="onsale">On Sale</span>
              </div>
            </div>
          </div>
        `
      })

      productCount.innerHTML = products.length;

      productsList.innerHTML = str;



      //隱藏loading...
      document.querySelector('.loading-background').style = "display:none !important";
    },

  }
  obj.getData();



});