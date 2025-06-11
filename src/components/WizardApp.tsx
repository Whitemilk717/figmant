/* Imports
------------------------------------------------------------ */
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { EditComponent } from './EditComponent';
import { select, button, centeredBox } from '../styles/wizardAppStyle';


/* WizardApp React component 
------------------------------------------------------------ */
export const WizardApp = () => {

    const [mode, setMode] = useState('create');                     // Mode selected by the wizard (default = create)
    const wizardText = useRef('');                                  // Text inserted by the wizard
    const [textNodes, setTextNodes] = useState([]);                 // Selectable text nodes present in figma canvas
    const [selectedComponent, setSelectedComponent] = useState(''); // Mode selected by the wizard


    /* Text node list handler 
    -------------------------------------------------------- */
    onmessage = (event) => {
        if (event.data.pluginMessage.type === 'textNodes') {
            setTextNodes(event.data.pluginMessage.payload);
        }
    }


    /* Initial value for the component selected by the wizard
    -------------------------------------------------------- */
    React.useEffect(() => {
        if (textNodes.length > 0) {
            setSelectedComponent(textNodes[0]);
        }
    }, [textNodes]);


    /* Function to close the plugin
    -------------------------------------------------------- */
    function closePlugin(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'closePlugin',
            }
        }, '*');
    }


    /* JSX 
    -------------------------------------------------------- */
    return (
        <div>
            
            <p>Select a mode:</p>
            {/* <div style={ centeredBox }>     */}
            <div>
                <select style={ select } onChange={ (e) => setMode(e.target.value) } >
                    <option value='create'>Create</option>
                    <option value='edit'>Edit</option>
                    <option value='delete'>Delete</option>
                </select>
            </div>

            <hr />

            { mode === 'create' &&  (
                <div>
                    <p>Create a new component:</p>
                </div>
            )}
                
            { mode === 'edit' && (
                <EditComponent 
                textNodes={ textNodes }
                wizardText={ wizardText }
                selectedComponent={ selectedComponent }
                setSelectedComponent={ setSelectedComponent }
                />
            )}

            { mode === 'delete' && (
                <p>Delete mode</p>
            )}

            <hr />

            <p>End WoZ simulation:</p>
            {/* <div style={ centeredBox }>  */}
            <div>
                <button style={ button } onClick={ () => closePlugin() }>End simulation</button>
            </div>

        </div>
    );
};