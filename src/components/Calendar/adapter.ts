import { v1 as uuidv1 } from 'uuid';
import moment from 'moment';
import { type WeekDayName, type CalendarDay } from '../../types/global';

const days: WeekDayName[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const weekDaySliceMapped: {[key: string]: number} = {
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6,
  'Sunday': 7,
}

function getDaysArrayByMonth(month: number, year: number) {
  let curMonth: number = month;
  let curYear: number = year;

  let daysInMonth = moment(`${curYear}-${curMonth}`, "YYYY-MM").daysInMonth();
  
  if (month === 0) {
    curYear = year - 1;
    curMonth = 12;
    daysInMonth = moment(`${curYear}-${curMonth}`, "YYYY-MM").daysInMonth();
  }
  if (month === 13) {
    curYear = year + 1;
    curMonth = 1;
    daysInMonth = moment(`${curYear}-${curMonth}`, "YYYY-MM").daysInMonth();
  }

  const arrDays = [];

  while(daysInMonth) {
    const current = { 
      day: daysInMonth, 
      month: curMonth, 
      year: curYear, 
      active: false, 
      hl: false, 
      id: uuidv1() 
    };
    arrDays.push(current);
    daysInMonth--;
  }
  return arrDays;
}


export function getDaysInMonth(currentYear: number, currentMonth: number) {
  return new Date(currentYear, currentMonth, 0).getDate();
};

function getPrevMonthDays(day: WeekDayName, month: number, year: number) {
  const daysTotalLastMonth: number = getDaysInMonth(year, (month-1));
  return day !== 'Monday' 
    ? Array.from({length: Number(daysTotalLastMonth)}, (_, i) => i + 1)
      .slice(-(weekDaySliceMapped[day] - 1))
      .map(getRenderObjectInactive)
    : [];
};

function getNextMonthDays(daysLastMonth: number, daysCurrentMonth: number) {
  const daysPrevCurTotal = daysLastMonth + daysCurrentMonth;
  const totalLastBenchmark = daysPrevCurTotal > 35 ? 42 : 35;
  
  const totalDaysNextMonth = totalLastBenchmark - daysLastMonth - daysCurrentMonth;

  return totalDaysNextMonth > 0 ? Array.from({length: totalDaysNextMonth}, (_, i) => i + 1)
    .map(getRenderObjectInactive) : [];
};


export function getFirstWeekDayCurMonth(now: Date, currentYear: number, currentMonth: number): WeekDayName {
  return days[new Date(now.setFullYear(currentYear, (currentMonth - 1), 1)).getDay()];
};

function getRenderObjectInactive(d: number): CalendarDay {
  return {number: d, active: false, hl: false, id: uuidv1()};
}

function getRenderObjectActive(date: number) {
  return function(d: number): CalendarDay {
   // console.log('=== ', moment(`${d}-${month}-${year}`).format('YYYY-MM-DD'));
    return {number: d, active: true, hl: d === date, id: uuidv1()};
  }
}

// month -> real month!
export function getDisplayDays(month: number, date: number): {[x: number]: CalendarDay[]} {
  const now = new Date();
  const currentYear: number = now.getFullYear();

  const firstWeekDayName: WeekDayName = getFirstWeekDayCurMonth(now, currentYear, month);


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
  const currentMonthDays = getDaysArrayByMonth(month,currentYear);
  const prevMonthDays = getDaysArrayByMonth((month-1),currentYear);
  const nextMonthDays = getDaysArrayByMonth((month+1),currentYear);
  console.log('currentMonthDays ************** ', currentMonthDays);
  console.log('prevMonthDays ************** ', prevMonthDays);
  console.log('nextMonthDays ************** ', nextMonthDays);
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  const daysTotalCurrentMonth = getDaysInMonth(currentYear, month);
  // const daysTotalLastMonth = getDaysInMonth(currentYear, month - 1);

  // 1. Display Days Current Month
  const displayDaysCurMonth = Array.from({length: daysTotalCurrentMonth}, (_, i) => i + 1)
    .map(getRenderObjectActive(date));

  // 2. Display Days PREV Month
  const displayDaysLastMonth = getPrevMonthDays(firstWeekDayName, month, currentYear);

  // 3. Display Days Next Month
  const displayDaysNextMonth = getNextMonthDays(displayDaysLastMonth.length, displayDaysCurMonth.length);

  return {
    [month]: [
    ...displayDaysLastMonth, 
    ...displayDaysCurMonth, 
    ...displayDaysNextMonth
  ]};
};