import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/hooks";

function App() {
    const {onToggleButton, tg} = useTelegram()

    useEffect(() => {
        tg.ready();
    }, [])

       return (
        <div className={'app'}>
            <button onClick={onToggleButton}>toggle</button>
        </div>
    )
}

export default App;