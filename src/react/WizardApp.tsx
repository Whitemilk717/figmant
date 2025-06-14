/* Imports
------------------------------------------------------------ */
import './style';
import * as React from 'react';
import { useState } from 'react';
import { EditMode } from './mode-components/EditMode';
import { CreateMode } from './mode-components/CreateMode';


/* WizardApp React component 
------------------------------------------------------------ */
export const WizardApp = () => {


    // Data
    const [mode, setMode] = useState('create');                     // Mode selected by the wizard
    const [answers, setAnswers] = useState([]);                     // Selectable answers present in Figma canvas
    


    // Saving available selectable answers
    onmessage = (msg) => {
        if (msg.data.pluginMessage.type === 'answers') {
            setAnswers(msg.data.pluginMessage.payload);
        }
    }


    // Function that sends the last message
    function closePlugin(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'closePlugin',
            }
        }, '*');
    }


    // JSX 
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

            { mode === 'create' &&  (
                <CreateMode />
            )}

            { mode === 'edit' && (
                <EditMode answers={ answers } />
            )}

            { mode === 'delete' && (
                <p>Delete mode</p>
            )}
            <hr />

            <p>End WoZ simulation:</p>
            <div className='centered-box'>
                <button className='red-button' onClick={ () => closePlugin() }>End simulation</button>
            </div>

        </div>
    );
};