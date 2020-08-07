// 先把與資料結構有關的挑出來做

// -製作登入
// -列出產品,顯示產品列表
//   -驗證
// -分頁功能（Ajax，如何閱讀 Ajax結果）
//   -取得分頁
//   -了解分頁結構
// -新增／編輯產品
//   -產生元件
//   -取得遠端資料
//   -更新（emit)
// -刪除  

// 匯入 pagination
import pagination from './pagination.js';

// 匯入 modal
import modal from './modal.js';

Vue.component('pagination', pagination);
Vue.component('modal', modal);

new Vue({
  el: '#app',
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: []
    },
    api: {
      uuid: '24929ac2-65a9-4291-a9e2-36db27d3f820',
      path: 'https://course-ec-api.hexschool.io/api/',
    },
    token: '',
    isNew: false,
    loadingBtn: '',
  },
  methods: {
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: []
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.loadingBtn = item.id; // 讀取效果
          const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
          axios.get(url)
          .then((res) => {
            this.tempProduct = res.data.data;
            this.isNew = false;
            $('#productModal').modal('show');
            this.loadingBtn = ''; //清除讀取效果
          });
          break;
        case 'delete':
          this.loadingBtn = item.id; // 讀取效果
          this.tempProduct = Object.assign({}, item);
          $('#delProductModal').modal('show');
          this.loadingBtn = ''; //清除讀取效果
          break;
        default:
          break;
      }
    },
    delProduct() {

      let url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
      axios.delete(url, this.tempProduct.id)
      .then(res => {
        this.getProducts();
        this.tempProduct = { 
          imageUrl: [],
        };
      });

      $('#delProductModal').modal('hide');
    },
    getProducts(num = 1) {
      // ES6 預設頁數設為第一頁

      // console.log(num);
      const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
      axios.get(url).then((res) => {
        // console.log(res);
        // 將資料複製到 products
        this.products = res.data.data;
        // 將資料複製到 pagination
        this.pagination = res.data.meta.pagination;

        //如果有id 代表有資料 所以觸發關閉彈跳視窗
        if (this.tempProduct.id) {
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('hide');
        }
      });
    },
  },
  created() {
    // 帶出 token
    // 將token取出來 如果放在生命週期created() 只需要寫一次
    // 將token取出來 並存在vue的資料 token裡面
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    // 作為預設值發送
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

    // console.log(this.isNew);
    this.getProducts();
  },
});