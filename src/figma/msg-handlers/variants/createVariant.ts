/* Imports
------------------------------------------------------------ */
import { sendBox } from '../../boxes/sendBox'; 
import { searchBox } from '../../boxes/searchBox';


/* Function to create a variant
------------------------------------------------------------ */
export async function createVariant(msg) {


    // Data
    let variantName = '';
    const frame = searchBox.frameNamed(msg.frame) as FrameNode;
    
    
    // Configuration of the variant name
    msg.props.forEach(p => {
        variantName = variantName + `${p.name}=${p.value}, `;
    });
    variantName = variantName.slice(0, -2);                     // Removing the last ', '


    // Variant creation
    const originalVariant = await searchBox.variantNamed(variantName, msg.set) as ComponentNode;
    if (!originalVariant) {
        figma.notify('This combination of properties is not supported');
        return;
    }

    const newVariant = originalVariant.createInstance();
    
    const num = await searchBox.nextVariantNum(variantName);;
    newVariant.name = num + variantName;

    frame.appendChild(newVariant);


    // Sending log message about variant creation
    await sendBox.logMsg(`Variant "${newVariant.name}" from the component set "${msg.set}" has been created in frame "${frame.name}"`);
    

    // Send every created variants in the current page to WizardApp
    sendBox.createdVariants();
}