<template>
  <div>
    <v-layout row nowrap>
      <v-flex>
        <v-btn color="info" @click="generateInitialRoster" :disabled="isLoading">
          <v-icon left>refresh</v-icon> New Roster
        </v-btn>
      </v-flex>
      <v-flex>
        <h6 class="font-weight-black title blue--text" style="padding-top:13px">
          Salary Pts: {{totalSalary}}
        </h6>
      </v-flex>
    </v-layout>
    <v-tabs centered fixed-tabs light color="blue lighten-5">
      <v-tabs-slider color="orange"></v-tabs-slider>

      <v-tab href="#tab-main">
        Main
      </v-tab>

      <v-tab href="#tab-sub">
        Substitutions
      </v-tab>

      <v-tab-item id="tab-main">
        <BotList :bots="botList.filter(item => !item.isSubstitution)" :is-loading="isLoading"></BotList>
      </v-tab-item>
      <v-tab-item id="tab-sub" data-tab="substitution">
        <BotList :bots="botList.filter(item => item.isSubstitution)" :is-loading="isLoading"></BotList>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import BotDetail from '../Bot/Detail.vue';
  import BotList from '../Bot/List.vue';
  import GetInfoFact from './get-bot-list';
  import {median, quantile} from 'simple-statistics';

  export default {
    name: "RosterDetail",
    components: {
      BotList,
      BotDetail
    },
    data() {
      return {
        botList: [],
        infoFactory: GetInfoFact(175),
        totalSalary: 0,
        getObject: null,
        headers: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Total Attr',
            value: 'totalAttribute',
            align: 'right'
          },
          {
            text: 'Salary Points',
            value: 'salary',
            align: 'right'
          },
        ],
        isLoading: true
      }
    },
    created() {
      this.generateInitialRoster();
    },
    methods: {
      generateInitialRoster() {
        this.isLoading = true;
        this.botList = [];
        this.getObject = GetInfoFact(175).getObject();
        this.totalSalary = 0;
        setTimeout(() => {
          this.botList = new Array(15).fill({salary: null}).map(() => this.getObject());
          const performanceStats = this.botList.map(item => item.totalAttribute);
          const medianTotalAttribute = median(performanceStats);
          const quantile30 = quantile(performanceStats, .3);
          this.botList = this.botList.map(item => {
            item.hasGoodStat = item.totalAttribute > medianTotalAttribute;
            item.isSubstitution = item.totalAttribute <= quantile30;
            return item;
          });
          this.updateTotalSalary();
          this.isLoading = false;
        }, 1000);
      },
      updateTotalSalary() {
        this.totalSalary = this.botList.reduce((currentSum, item) => {
          currentSum += item.salary;
          return currentSum;
        }, 0);
      }
    },
    computed: {
      currentRoster() {
        return this.botList;
      }
    }
  }
</script>

<style scoped lang="scss">
/deep/ .v-datatable__actions__range-controls {
  display: none;
}
</style>
