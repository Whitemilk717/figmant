/* Imports
------------------------------------------------------------ */
import '../../../style.css';
import * as React from 'react';
import { useState, useEffect } from 'react';


/* EditComponent 
------------------------------------------------------------ */
export const HideMode = (props) => {

    // Data
    const [targetNodes, setTargetNodes] = useState([]);   // nodes selected by the wizard


    // Function to send the hide message
    function sendMsg(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'hideNodes',
                targets: targetNodes
            }
        }, '*');
    }


    // Whenever the selectable nodes change, if possible, the first one is selected
    useEffect(() => {
        if (props.nodes.length != 0 && targetNodes.length == 0) {
            setTargetNodes([props.nodes[0].name]);
        }
    }, [props.nodes]);


    // JSX
    return (
        <div>
            <p>Select the messages and the icons:</p>

                { props.nodes.length === 0 &&  (
                    <div className='centered-box'>
                        <p style={{ textAlign: 'center' }}>There are no selectable messages or icons</p>
                    </div>
                )}

                { props.nodes.length != 0 && (
                    <div className='centered-box'>
                        <select className='multiple-select' multiple onChange={ (e) => setTargetNodes(Array.from(e.target.selectedOptions, option => option.value)) }>
                            { props.nodes.map(node => {
                                return <option key={ node.name } value={ node.name }>

                                    { node.name.includes('icon') && node.name }

                                    { (node.name.includes('question') || node.name.includes('answer')) && 
                                        (node.fullText
                                            ? node.name + ' (' + node.preview + ')'
                                            : node.name + ' (' + node.preview + '...)'
                                        )
                                    }

                                </option>
                            }) }
                        </select>
                        <button className='spaced-green-button' onClick={ () => sendMsg() }>Invia</button>
                    </div>
                ) }
        </div>
    )

}