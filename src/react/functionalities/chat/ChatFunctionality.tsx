/* Imports
------------------------------------------------------------ */
import '../../style.css';
import * as React from 'react';
import { useState } from 'react';
import { EditMode } from './mode-components/EditMode';
import { HideMode } from './mode-components/HideMode';
import { CreateMode } from './mode-components/CreateMode';


/* ChatFunctionality React component 
------------------------------------------------------------ */
export const ChatFunctionality = (props) => {


    // Data
    const [mode, setMode] = useState('create'); // Mode selected by the wizard


    // JSX 
    return (
        <div>

            <p>Select a chat mode:</p>
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
                <EditMode answers={ props.answers } />
            )}

            { mode === 'hide' && (
                <HideMode nodes={ props.nodes } />
            )}
            <hr />

        </div>
    );
};