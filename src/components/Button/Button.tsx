import { FC } from 'react';
import './Button.css';

interface ButtonProps {
  className?: string;
  onClick: () => void;
  text: string;
}

const Button: FC<ButtonProps> = ({text, className}) => {
    return (
      <button className={'button ' + className}>{text}</button>
    );
};

export default Button;