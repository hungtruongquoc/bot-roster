<template>
  <v-data-table :items="bots" :headers="headers" item-key="id"
                :rows-per-page-items="[{value: -1}]" :loading="isLoading">
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
      <BotDetail :bot="props.item" @click="props.expanded = !props.expanded"
                 @tr-clicked="props.expanded = !props.expanded"/>
    </template>
    <template slot="expand" slot-scope="props">
      <v-container>
        <v-layout row nowrap>
          <v-flex>
            <v-card flat class="text-xs-center">
              <div>
                <v-icon>accessibility_new</v-icon>
              </div>
              <div class="subheading">Strength</div>
              <h4 class="display-1">{{props.item.strength}}</h4>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card flat class="text-xs-center">
              <div>
                <v-icon>transfer_within_a_station</v-icon>
              </div>
              <div class="subheading">Agility</div>
              <h4 class="display-1">{{props.item.agility}}</h4>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card flat class="text-xs-center">
              <div>
                <v-icon>directions_run</v-icon>
              </div>
              <div class="subheading">Speed</div>
              <h4 class="display-1">{{props.item.speed}}</h4>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
  import BotDetail from '../Bot/Detail.vue';

  export default {
    name: "BotList",
    components: {
      BotDetail
    },
    props: {
      bots: {
        default() {
          return [];
        }
      },
      isLoading: true
    },
    data() {
      return {
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
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
