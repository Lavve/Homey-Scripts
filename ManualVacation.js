/**
 * Run every day at 0:01 at night
 **/

const vacationDates = [
  // ['Vacation starts', 'Work starts']
  ['2021-07-17', '2021-09-23'],
  ['2021-12-24', '2022-01-10'],
];
const today = new Date();
let vacation = false;

for (let i = 0; i < vacationDates.length; i++) {
  const startDate = new Date(vacationDates[i][0]);
  const stopDate = new Date(vacationDates[i][1]);

  if (today >= startDate && today <= stopDate) {
    log('Idag', today);
    log('Start', startDate);
    log('Stop', stopDate);
    vacation = true;
  }
}

log('Vacation', vacation);
await tag('Vacation', vacation);

return vacation;
