import React from 'react';
import './Header.css'
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/hooks";

const Header = () => {
const {user,onClose, onToggleButton} = useTelegram()
    return (
        <div className={'header'}>
<Button  onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;