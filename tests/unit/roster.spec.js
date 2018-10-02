import {shallowMount} from '@vue/test-utils';
import RosterDetail from '../../src/components/Roster/Detail.vue';
/**
 * https://alexjover.com/2017/09/18/test-computed-properties-and-watchers-in-vue-js-components-with-jest/
 * https://blog.octo.com/en/vue-js-unit-test-cases-with-vue-test-utils-and-jest/
 */

describe('RosterDetail.vue', () => {
  let wrapper;
  const hasDuplicate = (item, index, array) => {
    return index !== array.indexOf(item);
  };

  beforeEach(() => {
    wrapper = shallowMount(RosterDetail, {propsData: {}});
  });

  it('has a created hook', () => {
    expect(typeof RosterDetail.created).toBe('function');
  });

  it('has a computed object with 15 objects', () => {
    expect(typeof wrapper.vm.currentRoster).toBe('object');
    expect(wrapper.vm.currentRoster.length).toBe(15);
  });

  it('has a roster with no bot having total attribute > 100 ', () => {
    expect(wrapper.vm.currentRoster.every(item => item.totalAttribute < 101)).toBeTruthy();
  });

  it('has a roster with no duplicate of total attribute value', () => {
    const itemTotals = wrapper.vm.currentRoster.map(item => item.totalAttribute);
    expect(itemTotals.filter(hasDuplicate).length).toBe(0);
  });

  it('has a roster with no duplicate name', () => {
    const itemNames = wrapper.vm.currentRoster.map(item => item.name);
    expect(itemNames.filter(hasDuplicate).length).toBe(0);
  });

  it('has a roster with total of salary no greater than 175', () => {
    const totalSalary = wrapper.vm.currentRoster.reduce((salary, item) => {
      salary += item.salary;
      return salary;
    }, 0);
    expect(totalSalary <= 175).toBeTruthy;
  });
});
