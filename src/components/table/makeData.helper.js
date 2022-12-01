const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const names = ['Steven', 'john', 'tom', 'bob', 'fred', 'sarah', 'sami', 'kristy'];

const newEvent = (d) => {
  const mainEventChance = Math.random()
  const subEventChance = Math.random()
  const subEvent = subEventChance > 0.66
    ? 'Blown Breaker'
    : subEventChance > 0.33
    ? 'Damaged Wire'
    : 'Water Damage';
  const locationChance = Math.random()
  const jobsite = locationChance > 0.5 ? 'Phoenix' : 'New York';
  return {
    id: d,
    jobsite,
    mainEvent: mainEventChance > 0.66
        ? 'Electrical'
        : mainEventChance > 0.33
        ? 'Mechanical'
        : 'Software',
    subEvent,
    owners: [...names].sort(() => 0.5 - Math.random()).slice(0, 3).join(','),
    description: `${subEvent} in ${jobsite}`,
    active: Math.random() > 0.5,
  }
}

export const makeDataHelper = (count) => {
  return range(count).map(d => {
    return {
      ...newEvent(d),
    }
  });
}
