<template>
  <tr @click="edmitTrClick($event)">
    <td class="body-2">
      <div class="hidden-xs-only">
        <v-avatar color="success" size="32" class="white--text font-weight-black" v-if="!bot.isSubstitution">
          {{initial}}
        </v-avatar>
        <v-avatar color="grey" size="32" class="white--text font-weight-black" v-if="bot.isSubstitution">
          {{initial}}
        </v-avatar>
        {{bot.name}}
      </div>
      <div class="hidden-sm-and-up">
          {{bot.name}}
      </div>
    </td>
    <td class="text-xs-right body-2 font-weight-bold"
        :class="{'red--text': !bot.hasGoodStat, 'green--text': bot.hasGoodStat}">
      {{ bot.totalAttribute }}
    </td>
    <td class="text-xs-right body-2">{{ bot.salary }}</td>
  </tr>
</template>

<script>
  export default {
    name: "BotDetail",
    props: {
      bot: {
        default: {
          name: 'test'
        }
      }
    },
    methods: {
      edmitTrClick(event) {
        this.$emit('tr-clicked', event);
      }
    },
    computed: {
      initial() {
        return this.bot.name.charAt(0);
      }
    }
  }
</script>

<style scoped>

</style>

