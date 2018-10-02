import * as Faker from 'faker';

export default function (salaryCap) {
  const totalList = [];
  const nameList = [];
  let currentTotalSalary = 0;
  let maxSalary = Faker.random.number(salaryCap);
  const getTotal = () => {
    let itemTotalAttribute;
    do {
      itemTotalAttribute = Faker.random.number(100);
    }
    while (totalList.length > 0 && totalList.some(item => item === itemTotalAttribute));
    totalList.push(itemTotalAttribute);
    return itemTotalAttribute;
  };
  const getName = () => {
    let newName = '';
    do {
      newName = [Faker.name.firstName(), Faker.name.lastName()].join(' ')
    }
    while (nameList.length > 0 && nameList.some(item => item === newName));
    nameList.push(newName);
    return newName;
  };
  const getSalary = () => {
    const newSalary = Faker.random.number(maxSalary - currentTotalSalary);
    currentTotalSalary += newSalary;
    return newSalary;
  };
  return {
    getObject() {
      return () => {
        const name = getName();
        const itemTotalAttribute = getTotal();
        const agility = Faker.random.number(itemTotalAttribute);
        const speed = Faker.random.number(itemTotalAttribute - agility);
        const strength = itemTotalAttribute - agility - speed;
        const salary = getSalary();
        const id = Faker.finance.bic();
        return {name, agility, strength, speed, totalAttribute: itemTotalAttribute, salary, id};
      }
    }
  }
};
