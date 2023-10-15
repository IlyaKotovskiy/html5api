import { Container } from "./components/Container";
import { TableItem } from "./components/TableItem";
import { useEffect, useState } from "react";

export function App() {
    const [ selectedStorage, setSelectedStorage ] = useState('local');
    const [ rows, setRows ] = useState([]);
    const [ key, setKey ] = useState('');
    const [ data, setData ] = useState('');

    console.log(rows)

    useEffect(() => {
        const keys = Object.keys(localStorage);

        const rowsFromLocalStorage = keys.map((key, index) => ({
            id: index + 1,
            keyTb: key,
            value: localStorage.getItem(key),
        }));

        setRows(rowsFromLocalStorage)
    }, []);

    const handleStorageChange = (e) => {
        const newStorage = e.target.value;
        setSelectedStorage(newStorage);

        if (newStorage === 'local') {
            const keys = Object.keys(localStorage);
            const rowsFromLocalStorage = keys.map((key, index) => ({
                id: index + 1,
                keyTb: key,
                value: localStorage.getItem(key),
            }));
            setRows(rowsFromLocalStorage);
        } else if (newStorage === 'session'){
            const keys = Object.keys(sessionStorage);
            const rowsFromLocalStorage = keys.map((key, index) => ({
                id: index + 1,
                keyTb: key,
                value: sessionStorage.getItem(key),
            }));
            setRows(rowsFromLocalStorage);
        }
    };
    const handleKeyChange = (e) => {
        setKey(e.target.value);
    };
    const handleDataChange = (e) => {
        setData(e.target.value);
    };
    const handleSave = () => {
        if (selectedStorage === 'local' && (key !== '' && data !== '')) {
            setRows([ ...rows ,{id: rows.length + 1, keyTb: key, value: data} ])
            localStorage.setItem(key, data);
        } else if (selectedStorage === 'session' && (key !== '' && data !== '')) {
            sessionStorage.setItem(key, data);
        }
    };
    const handleDeleteAllRows = () => {
        const localKeys = Object.keys(localStorage);
        const sessionKeys = Object.keys(sessionStorage);

        localKeys.map(key => localStorage.removeItem(key));
        sessionKeys.map(key => sessionStorage.removeItem(key));

        setRows([]);
    }

    return (
        <Container>
            <p className="d-flex select">Выберите тип хранилища
                <select name="storages" id="storages" onChange={ handleStorageChange }>
                    <option value="local">localStorage</option>
                    <option value="session">sessionStorage</option>
                </select>
            </p>
            <form>
                <label>
                    <p>Ключ: </p>
                    <input type="text" value={ key } onChange={ handleKeyChange }/>
                </label>
                <label>
                    <p>Данные: </p>
                    <input type="text" value={ data } onChange={ handleDataChange }/>
                </label>
                <button className="saveBtn" type="button" onClick={ handleSave }>Сохранить</button>
            </form>

            <div className="table">
                <div className="headTable d-flex">
                    <div>№</div>
                    <div>Ключ</div>
                    <div>Значение</div>
                </div>
                <div className="bodyTable">
                    {rows.map(elem => <TableItem
                        key={elem.id}
                        id={elem.id}
                        keyTb={elem.keyTb}
                        value={elem.value}
                    />)}
                </div>
            </div>
            <button type="button" onClick={() => handleDeleteAllRows()}>Delete All</button>
        </Container>
    )
}