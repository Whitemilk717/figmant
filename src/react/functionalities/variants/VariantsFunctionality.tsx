/* Imports
------------------------------------------------------------ */
import '../../style.css';
import * as React from 'react';
import { useState } from 'react';
import { EditMode } from './mode-components/EditMode';
import { HideMode } from './mode-components/HideMode';
import { CreateMode } from './mode-components/CreateMode';


/* VariantsFunctionality React component 
------------------------------------------------------------ */
export const VariantsFunctionality = (props) => {


    // Data
    const [mode, setMode] = useState('create'); // Mode selected by the wizard


    // JSX 
    return (
        <div>

            <p>Select a variants mode:</p>
            <div className='centered-box'>
                <select className='single-select' onChange={ (e) => setMode(e.target.value) } >
                    <option value='create'>Create new variant</option>
                    <option value='edit'>Edit variant</option>
                    <option value='hide'>Hide variants</option>
                </select>
            </div>
            <hr />

            { mode === 'create' &&  (
                <CreateMode compSets={ props.compSets } frames={ props.frames }/>
            )}

            { mode === 'edit' && (
                <EditMode variants={ props.variants } />
            )}

            { mode === 'hide' && (
                <HideMode variants={ props.variants } />
            )}
            <hr />

        </div>
    );
};