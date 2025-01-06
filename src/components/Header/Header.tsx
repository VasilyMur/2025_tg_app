import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header: React.FC = () => {
  const {user, onClose} = useTelegram();

  return (
    <div className={'header'}>
      <Button onClick={onClose} text="Закрыть"/>
      <span className={'username'}>
        {user?.username}
      </span>
    </div>
  );
};

export default Header;