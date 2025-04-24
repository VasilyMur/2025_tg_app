import { FC, useState, useEffect, ChangeEvent } from 'react';
import moment from 'moment';
import { getDisplayDays } from './adapter';
import HeaderGridChunk from './HeaderGridChunk';
import './Calendar.css';

interface ICalendarProps {
  onAdd?: () => void;
  month?: number;
}

const monthNamesMapped: {[key: string]: string} = {
  1: 'Январь',
  2: 'Февраль',
  3: 'Март',
  4: 'Апрель',
  5: 'Май',
  6: 'Июнь',
  7: 'Июль',
  8: 'Август',
  9: 'Сентябрь',
  10: 'Октябрь',
  11: 'Ноябрь',
  12: 'Декабрь',
}

const Calendar: FC<ICalendarProps> = () => {
  const [ month, setMonth ] = useState<string>('1');
  const [ date, setDate ] = useState<number>(1);

  useEffect(() => {
    setDate(new Date().getDate());
  }, []);

  const updateMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setMonth(e.target.value);
      setDate(new Date().getDate());
    }
  }

  const handleDayClick = (d: number, active: boolean) => {
    if (d && active) {
      setDate(d);
    }
  }

  const displayDays = getDisplayDays(Number(month), date);
  console.log('displayDays >>>>>>>>>>>> ', displayDays);

  const test = new Date();
  console.log('moment >>> ----- ', moment(test).format()  )

  const bookingDays: {[key: string]: number[]} = {
    1: [13,18,19]
  };

  // request getSlots/2025-01-17
  // response data:
  //  {time: "11:00", seance_length: 3600, datetime: "T11:00:00+03:00"}

  // const t = {
  //   1: {
  //     dates: [13,18,19],
  //     slots: {
  //       13: ['13:00', '14:00'],
  //       18: ['09:30', '15:30'],
  //       19: ['10:30', '11:30', '12:30'],
  //     }
  //   }
  // }

  // const bookingTime: {[key: string]: string[]} = {
  //   13: ['13:00', '14:00'],
  //   18: ['09:30', '15:30'],
  //   19: ['10:30', '11:30', '12:30'],
  // };



  return (
    <div className="container">
      <select onChange={updateMonth} value={month}>
        {Object.keys(monthNamesMapped)
          .map(m => 
          <option key={m} value={m}>
            {monthNamesMapped[m as keyof typeof monthNamesMapped]}
          </option>)}
      </select>
      <HeaderGridChunk />
      <div className="calendar-body">
        <div className="calendar-wrap">
          {displayDays[Number(month)].map(d => {
            return <div className="calendar-day" key={d.id} onClick={() => handleDayClick(d.number, d.active)}>
              <div className={d.active ? 'calendar-day-wrap' : 'calendar-day-wrap inactive'}>
                <div className='calendar-day-number'>
                  <span className={`${d.hl ? 'active' : ''}`}>{d.number}</span>
                  {d.hl ? (<div className="day-hl"></div>) : null}
                </div>
                </div>
              </div>
            })}
        </div>     
      </div>

      <div className="time-options">
        {bookingDays[month]?.length ? 'options' : ''}
      </div>
    </div>
  );
};

export default Calendar;