<template>
  <div id="va_home_transactions_pagination" class="flex items-center justify-between">
    <div>
      <btn role="secondary" @click.native="prev">
        <solid-chevron-left-icon class="w-6 m-auto" />
      </btn>
    </div>
    <div>
      <span v-text="currentPage" />
      <span>/</span>
      <span v-text="!filteredTransactions.length ? pagesCount : filteredPagesCount" />
    </div>
    <div>
      <btn role="secondary" @click.native="next">
        <solid-chevron-right-icon class="w-6 m-auto" />
      </btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HomeTransactionsPagination',
  computed: {
    ...mapGetters({
      currentPage: 'transactions/page',
      pagesCount: 'transactions/pages',
      filteredTransactions: 'transactions/filtered',
      filteredPagesCount: 'transactions/filteredPages'
    })
  },
  methods: {
    ...mapMutations({
      next: 'transactions/nextPage',
      prev: 'transactions/prevPage'
    })
  }
}
</script>
