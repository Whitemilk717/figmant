/* Imports
------------------------------------------------------------ */
import '../../../style.css';
import * as React from 'react';
import { useEffect, useState } from 'react';


/* HideMode
------------------------------------------------------------ */
export const HideMode = (props) => {


    // Data
    const [targetVariants, setTargetVariants] = useState([]); // Name of the selected variants

    // Function to send the hiding message
    function sendMsg(): void {
        parent.postMessage({
            pluginMessage: {
                type: 'hideVariants',
                variants: targetVariants
            }
        }, '*');
    }


    // Whenever the selectable variants change, if possible and if nothing has been selected yet, the first one is selected (default value)
    useEffect(() => {
        if (props.variants.length != 0 && targetVariants.length == 0) {
            setTargetVariants([props.variants[0].variant]);
        }
    }, [props.variants]);


    // JSX
    return (
            <fieldset>
                <legend><b>Variants selection</b></legend>

                <p>Select the existing variants:</p>
                { props.variants.length === 0 && (
                    <div className='centered-box'>
                        <p style={{ textAlign: 'center' }}>There are no selectable existing variants</p>
                    </div>
                )}

                { props.variants.length != 0 && (
                    <div>
                        <div className='centered-box'>
                            <select 
                                className='multiple-select'
                                multiple
                                onChange={ (e) => {
                                    setTargetVariants(Array.from(e.target.selectedOptions, option => option.value));
                                }}
                            >
                                { props.variants.map(v => {
                                    return <option key={ v.variant } value={ v.variant }>
                                        { `[${v.set}]: ${v.frame} / ${v.variant}` }
                                    </option>
                                })}
                            </select>
                        </div>
                        <hr />


                        <div className='centered-box'>
                            <p>Hide the variants:</p>
                            <button className='green-button' onClick={ () => sendMsg() }>Hide</button>
                        </div>
                    </div>
                )}
            </fieldset>
    )
}