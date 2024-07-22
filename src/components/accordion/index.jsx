import { useState } from "react";
import data from './data.js';
import "./styles.css";

export default function Accordion() {
    const [selected, setSelected] = useState(null);
    const [multiSelection, setMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(currentid) {
        setSelected(currentid === selected ? null : currentid);
    }

    function handleMultipleSelection(currentid) {
        let cpyMultiple = [...multiple];
        const findcurrentid = cpyMultiple.indexOf(currentid);
        if (findcurrentid === -1) {
            cpyMultiple.push(currentid);
        } else {
            cpyMultiple.splice(findcurrentid, 1);
        }
        setMultiple(cpyMultiple);
    }

    return (
        <div className="wrapper">
            <button onClick={() => setMultiSelection(!multiSelection)}>Enable Multi-Selection</button>
            <div className="accordion">
                {data && data.length > 0 ? 
                    data.map((dataitem) => (
                        <div className="item" key={dataitem.id}>
                            <div 
                                onClick={multiSelection 
                                    ? () => handleMultipleSelection(dataitem.id)
                                    : () => handleSingleSelection(dataitem.id)} 
                                className="title">
                                <h3>{dataitem.question}</h3>
                                <span>+</span>
                            </div>
                            {multiSelection
                                ? multiple.indexOf(dataitem.id) !== -1 && (
                                    <div className="content">{dataitem.answer}</div>
                                  )
                                : selected === dataitem.id && (
                                    <div className="content">{dataitem.answer}</div>
                                  )
                            }
                        </div>
                    ))
                    : <div>no data found</div>
                }
            </div>
        </div>
    );
}
