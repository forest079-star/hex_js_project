// 步驟01-取用 pages.total_pages 去跑迴圈
// 步驟02-將page-link  @click updatePage(num)
// 步驟03- 將當前的頁碼 ＋ .active
// :class="{ active: pages.current_page === idx }"



export default {
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: pages.current_page === 1}">
        <a class="page-link" href="#"  
          @click.prevent="updatePage(pages.current_page -1)">Previous
        </a>
      </li>

      <li class="page-item" v-for="i in pages.total_pages" :key="i" :class="{ active: pages.current_page === i }">
        <a class="page-link" href="#"
          @click.prevent="updatePage(i)">{{ i }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled:pages.current_page === pages.total_pages }">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page + 1)">Next</a>
      </li>
    </ul>
  </nav>`,
  data() {
    return {
      // tempProduct: {},
    };
  },
  props: ['pages'],
  methods: {
    updatePage(num) {
      this.$emit('update', num);
    },
  },
};