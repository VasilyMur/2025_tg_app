import { FC } from 'react';
import './HeaderGridChunk.css';

const weekDayNames = [
  {text: 'Пн', id: 1},
  {text: 'Вт', id: 2},
  {text: 'Ср', id: 3},
  {text: 'Чт', id: 4},
  {text: 'Пт', id: 5},
  {text: 'Сб', id: 6},
  {text: 'Вс', id: 7},
];

const HeaderGridChunk: FC = () => {

  return (
    <div className="calendar-header-container">
      {weekDayNames.map(d => <div className="calendar-header-day" key={d.id}>
        <span>{d.text}</span>
        </div>)}    
    </div>
  );
};

export default HeaderGridChunk;