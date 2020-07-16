new Vue({ // 建立一個 Vue 實體
  // id 綁定 
  el: '#app',
  // 資料 data
  data: {
    products: [
      {
        "id": "j4oKG5GVRCgZOtWeDyHhtsf5fqNqZaMkNudmVRqg5XDWBELczjF8nwrlq9qw7PRM",
        "title": "Just a Pen 任性系列",
        "category": "Fountain Pen",
        "content": "全新俐落，以鑽石切割技術製成，同時保有了 Just a Pen 的專利滾珠設計，貼心的提供使用者更舒適拿取的手感。",
        "description":"",
        "imageUrl": [
          "https://images.unsplash.com/photo-1530132174558-4541234246d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80"
        ],
        "enabled": true,
        "origin_price": 17000,
        "price": 15000,
        "unit": "NT$"
      },
      {
        "id": "ivW5fQPESjNldu1nDN1T4DMAxJTjhtmR01ZAsqEhrC5XHZS34X4HOfpBSK9HkBTr",
        "title": "Just a Pen 憂鬱系列",
        "category": "Fountain Pen",
        "content": "全新俐落，以憂鬱的心情切割技術製成，同時保有了 Just a Pen 的專利憂鬱設計。",
        "description":"",
        "imageUrl": [
          "https://images.unsplash.com/photo-1510034696085-597d716bd162?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        ],
        "enabled": true,
        "origin_price": 18000,
        "price": 13000,
        "unit": "NT$"
      },
      {
        "id": "VwmcCI9OhHJE4Dn50x8YyeCQYG2Y29GWLQc6PdvCzREVe3Meu7fAiFcgHW5oG3wf",
        "title": "Just a Pen Magic系列",
        "category": "Fountain Pen",
        "content": "以 Magic的心情切割技術製成，同時保有了 Just a Pen 的專利 Magic 設計，讓你保持神奇的觸感書寫。",
        "description":"",
        "imageUrl": [
          "https://images.unsplash.com/photo-1509827908497-9d239de281bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        ],
        "enabled": true,
        "origin_price": 25000,
        "price": 20000,
        "unit": "NT$"
      },
      {
        "id": "nMsNGlFHhhgreUj8YqIV4fsNyvD08MyoT3Ozlr8MOq5Llr70dMENVwMXwG56qLf1",
        "title": "Just a Pen 極致黑",
        "category": "Fountain Pen",
        "content": "義大利書寫精品第一品牌",
        "description":"",
        "imageUrl": [
          "https://images.unsplash.com/photo-1485815457792-d1a966f9bde0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        "enabled": true,
        "origin_price": 10000,
        "price": 8000,
        "unit": "NT$"
      },
      {
        "id": "bsdx64xlbY9veRNcEOSjwNAwBsY1Zr4ZcVjaCmwZchPcb1reS1igtdxvVXotXBYC",
        "title": "義大利 Just a Pen",
        "category": "Fountain Pen",
        "content": "義大利書寫精品第一品牌",
        "description":"",
        "imageUrl": [
          "https://images.unsplash.com/photo-1531087131490-07836ca4341d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        ],
        "enabled": true,
        "origin_price": 15000,
        "price": 12000,
        "unit": "NT$"
      }
    ],

    // 先製作一個空物件，用途是當編輯資料時，複製一份存取到這裡當暫存資料，避免直接改到真實資料
    tempProduct: {},
  },
  methods: {
    // @click 綁定在 model 確認修改的按鈕
    updateProduct() {
      // 用 id 判斷有無，來新增資料或是修改資料。
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          // 如果 products 的物品裡面的 id 等於暫存資料 tempProduct 的 id ，則要將資料更新為 tempProduct
          if (item.id === id) {

            //更新資料 
            //方法一：用這方法 利用 v-model方式已經綁定畫面 才會進而觸發讓兩個不同物件跟著綁定，但不是好作法。
            //this.products[i] = this.tempProduct; 
            
            //方法二：強制更新寫入方式  this.$set(目標, 屬性 ,值)
            this.$set(this.products, i , this.tempProduct );

            //兩個個又是同一個物件，因此又指向相同參考位置，所以設定一個{}指向去另一個空物件，讓他參考位置不同。
            this.tempProduct = {}; 
          }
        });
        //判斷如果沒有新的id 則建立一個新產品
      } else {
        // Unix Timestamp
        const id = new Date().getTime();  // 設定 id 的值
        // 將新設置的id 賦予到 tempProduct
        this.tempProduct.id = id;
        // 並且將 tempProduct 這筆資料 push 到 products 裡
        this.products.push(this.tempProduct);

      }
      // 完成後清空 tempProduct 的資料
      this.tempProduct = {};
      // 關閉彈跳視窗
      $('#productModal').modal('hide');
    },

    //@click 傳值，判斷是哪個視窗，在打開彈跳視窗。
    openModal(isNew, item) {
      
      
      switch (isNew) {
        case 'new':     // 新增
          this.tempProduct = {}; // 給新的參考路徑
          $('#productModal').modal('show');
          break;
        case 'edit':    // 編輯
          this.tempProduct = Object.assign({}, item); //將點擊到的 products資料的 item 淺拷貝至 tempProduct
          $('#productModal').modal('show');
          break;
        case 'delete':  // 刪除 
          $('#delProductModal').modal('show');
          this.tempProduct = Object.assign({}, item); //將點擊到的 products資料的 item 淺拷貝至 tempProduct
          break;
        default:
          break;
      }
    },
    // 刪除產品
    delProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => { // 將陣列裡的物件和索引依序提取出來
          if (item.id === id) { // 判斷此產品ID
            this.products.splice(i, 1); // 刪除該筆資料
            this.tempProduct = {}; // 再次清空暫存資料
          }
        });
      }
      $('#delProductModal').modal('hide'); // 按下確定後隱藏跳窗
    },
  },
});

