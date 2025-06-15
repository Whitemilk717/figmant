/* Imports
------------------------------------------------------------ */
import './style';
import * as React from 'react';
import { useState } from 'react';
import { EditMode } from './mode-components/EditMode';
import { HideMode } from './mode-components/HideMode';
import { CreateMode } from './mode-components/CreateMode';


/* WizardApp React component 
------------------------------------------------------------ */
export const WizardApp = () => {


    // Data
    const [nodes, setNodes] = useState([]);     // Selectable nodes present in the chatbox
    const [answers, setAnswers] = useState([]); // Selectable answers present in the chatbox
    const [mode, setMode] = useState('create'); // Mode selected by the wizard
    


    // Saving available selectable nodes and answers 
    onmessage = (msg) => {
        setNodes(msg.data.pluginMessage.nodes);
        setAnswers(msg.data.pluginMessage.answers);
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

            <p>Here are your personal notes:</p>
            <textarea className='notes-box' rows={ 4 } cols={ 43 }></textarea>
            <hr />
            
            <p>Select a mode:</p>
            <div className='centered-box'>
                <select className='single-select' onChange={ (e) => setMode(e.target.value) } >
                    <option value='create'>Create new answer</option>
                    <option value='edit'>Edit answer</option>
                    <option value='hide'>Hide messages and icons</option>
                </select>
            </div>
            <hr />

            { mode === 'create' &&  (
                <CreateMode />
            )}

            { mode === 'edit' && (
                <EditMode answers={ answers } />
            )}

            { mode === 'hide' && (
                <HideMode nodes={ nodes } />
            )}
            <hr />

            <p>End WoZ simulation:</p>
            <div className='centered-box'>
                <button className='red-button' onClick={ () => closePlugin() }>End simulation</button>
            </div>

        </div>
    );
};