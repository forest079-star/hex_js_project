import zh from './zh_TW.js';

// 自定義設定檔案，錯誤的 className
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// 載入自訂規則
VeeValidate.localize('tw', zh);
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// 掛載 Vue-Loading 套件
Vue.use(VueLoading);
// 全域註冊 VueLoading 並標籤設定為 loading
Vue.component('loading', VueLoading);

new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {
      num: 0,
    },
    status: {
      loadingItem: '',
    },
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    },
    cart: {},
    cartTotal: 0,
    isLoading: false,
    UUID: '24929ac2-65a9-4291-a9e2-36db27d3f820',
    apiPath: 'https://course-ec-api.hexschool.io',
  },

  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/products?page=${page}`;
      axios.get(url).then((response) => {
          this.products = response.data.data;
          this.isLoading = false;
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
          this.isLoading = false;
        });
    },
    getDetailed(id) {
      this.status.loadingItem = id;

      const url = `${this.apiPath}/api/${this.UUID}/ec/product/${id}`;
      console.log(id);
      axios.get(url).then((response) => {
        // 由於 tempProduct 的 num 沒有預設數字
        // 因此 options 無法選擇預設欄位，故要增加這一行解決該問題
        // 另外如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set
        // this.tempProduct = response.data.data;
        // this.tempProduct.num = 1;

        this.$set(this.tempProduct, 'num', 1);


        $('#productModal').modal('show');
        this.status.loadingItem = '';
      });
    },
    addToCart(item, quantity = 1) {
      this.status.loadingItem = item.id;

      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping`;

      const cart = {
        product: item.id,
        quantity,
      };

      console.log("一筆購物車資料", cart);

      axios.post(url, cart).then(() => {
        this.status.loadingItem = '';
        $('#productModal').modal('hide');
        this.getCart();
      }).catch((error) => {
        this.status.loadingItem = '';
        console.log(error.response.data.errors);
        $('#productModal').modal('hide');
      });
    },
    getCart() {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping`;

      axios.get(url).then((response) => {
          this.cart = response.data.data;
          
          this.totalUpdate()
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    totalUpdate() {
      //先清空 預設值
      this.cartTotal = 0;
      // 累加總金額
      this.cart.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity;
      });
    },
    quantityUpdate(id, num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return;

      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping`;

      const data = {
        product: id,
        quantity: num,
      };

      axios.patch(url, data).then(() => {
        this.isLoading = false;
        this.getCart();
      });
      
    },
    removeAllCartItem() {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping/all/product`;

      axios.delete(url)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        });
    },
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping/${id}`;

      axios.delete(url).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/orders`;

      axios.post(url, this.form).then((response) => {
        if (response.data.data.id) {
          this.isLoading = false;
          // 跳出提示訊息
          $('#orderModal').modal('show');

          // 重新渲染購物車
          this.getCart();
        }
      }).catch((error) => {
        this.isLoading = false;
        console.log(error.response.data.errors);
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
});