/* Imports
------------------------------------------------------------ */
import '../../style.css';
import * as React from 'react';
import { useState, useEffect } from 'react';


/* NavigationFunctionality React component 
------------------------------------------------------------ */
export const NavigationFunctionality = (props) => {


    // Data
    const [destinationFrame, setDestinationFrame] = useState('create'); // Destination frame selected by the wizard


    // Function to send the go to message
    function sendMsg(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'goTo',
                destinationFrame: destinationFrame
            }
        }, '*');
    }
    
    
    // Whenever the selectable frames change, if possible, the first one is selected (default value)
    useEffect(() => {
        if (props.frames.length != 0) {
            setDestinationFrame(props.frames[0]);
        }
    }, [props.frames]);


    // JSX 
    return (
        <div>

            <p>Select the destination frame:</p>
            { props.frames.length === 0 && (
                <p style={{ textAlign: 'center' }}>There are no selectable frames</p>
            )}

            { props.frames.length != 0 && (
                <div className='centered-box'>
                    <select className='single-select' onChange={ (e) => setDestinationFrame(e.target.value) }>
                        { props.frames.map(frame => {
                            return <option key={ frame } value={ frame }>
                                { frame }
                            </option>
                        }) }
                    </select>
                </div>
            )}
            <hr />


            <div className='centered-box'>
                <p>Go to destination frame:</p>
                <button className='green-button' onClick={ () => sendMsg() }>Go to</button>
            </div>

        </div>
    );
};