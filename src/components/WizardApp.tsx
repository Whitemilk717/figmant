/* Imports
------------------------------------------------------------ */
import '../styles/style';
import * as React from 'react';
import { useState } from 'react';
import { EditComponent } from './EditComponent';
import { CreateComponent } from './CreateComponent';


/* WizardApp React component 
------------------------------------------------------------ */
export const WizardApp = () => {

    const [mode, setMode] = useState('create');                     // Mode selected by the wizard (default = create)
    const [textNodes, setTextNodes] = useState([]);                 // Selectable text nodes present in figma canvas
    const [selectedComponent, setSelectedComponent] = useState(''); // Mode selected by the wizard


    /* Text node list handler 
    -------------------------------------------------------- */
    onmessage = (event) => {
        if (event.data.pluginMessage.type === 'answers') {
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
            <div className='centered-box'>
                <select className='select' onChange={ (e) => setMode(e.target.value) } >
                    <option value='create'>Create new answer</option>
                    <option value='edit'>Edit answer</option>
                    <option value='delete'>Delete answer</option>
                </select>
            </div>

            <hr />


            {/* Create mode
            ------------------------------------------------ */}
            { mode === 'create' &&  (
                <CreateComponent />
            )}


            {/* Edit mode
            ------------------------------------------------ */}    
            { mode === 'edit' && (
                <EditComponent 
                textNodes={ textNodes }
                selectedComponent={ selectedComponent }
                setSelectedComponent={ setSelectedComponent }
                />
            )}


            {/* Delete mode
            ------------------------------------------------ */}
            { mode === 'delete' && (
                <p>Delete mode</p>
            )}

            <hr />

            <p>End WoZ simulation:</p>
            <div className='centered-box'>
                <button className='end-simulation-button' onClick={ () => closePlugin() }>End simulation</button>
            </div>

        </div>
    );
};