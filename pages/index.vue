<template>
  <div id="va_home">
    <div id="va_home_transactions_wrapper">
      <div
        v-if="fetching.includes('transactions')"
        class="flex items-center justify-center text-mono-2"
      >
        <loading-icon class="w-10 animate-spin-slow opacity-75" />
      </div>
      <div v-else id="va_home_transactions_content" class="space-y-5">
        <home-transactions-filter />
        <home-transactions-pagination />
        <div v-if="!filteredTransactions.length" id="va_home_transactions_pages">
          <div v-for="(transactionsPage, pageIdx) in paginatedAllTransactions" :key="pageIdx">
            <home-transactions-page
              v-if="currentTransactionsPage === pageIdx + 1"
              :idx="pageIdx"
              :transactions="transactionsPage"
            />
          </div>
        </div>
        <div v-else id="va_home_filtered_transactions_pages">
          <div v-for="(transactionsPage, pageIdx) in paginatedFilteredTransactions" :key="pageIdx">
            <home-transactions-page
              v-if="currentTransactionsPage === pageIdx + 1"
              :idx="pageIdx"
              :transactions="transactionsPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { groupByNumber } from '~/utils/array'

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['balance', 'fetching']),
    ...mapGetters({
      allTransactions: 'transactions/all',
      filteredTransactions: 'transactions/filtered',
      transactionsItemsLimit: 'transactions/pageLimit',
      currentTransactionsPage: 'transactions/page'
    }),
    paginatedAllTransactions() {
      return groupByNumber(this.allTransactions, this.transactionsItemsLimit)
    },
    paginatedFilteredTransactions() {
      return groupByNumber(this.filteredTransactions, this.transactionsItemsLimit)
    }
  }
}
</script>
