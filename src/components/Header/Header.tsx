import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header: React.FC = () => {
  const {user, onClose} = useTelegram();

  return (
    <div className={'header'}>
      <button onClick={onClose} className={'button'}>
        Закрыть
      </button>
      <span className={'username'}>
        {user?.username}
      </span>
    </div>
  );
};

export default Header;