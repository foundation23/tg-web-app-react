import React, {useCallback, useEffect, useState} from 'react';
import "./Form.css"
import {useTelegram} from "../../hooks/hooks";

const Form = () => {
    const [country, setCountry] = useState('');
    const [sity, setSity] = useState('');
    const [subject, setSubject] = useState('physical')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            sity,
            subject
        }
        tg.sendData(JSON.stringify(data))
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [])

    useEffect(() => {
        tg.MainButton.setParams({
            tg: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if (!sity || !country) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, sity])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const onChangeSity = (e) => {
        setSity(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3> Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Город'}
                value={sity}
                onChange={onChangeSity}
            />
            <select
                value={subject}
                onChange={onChangeSubject}
                className={'select'}
            >

                <option value={'physical'}>Физ.лицо</option>
                <option value={'legal'}>Юр.лицо</option>
            </select>
        </div>
    );
};

export default Form;