/* Imports
------------------------------------------------------------ */
import { sendBox } from '../../boxes/sendBox'; 
import { searchBox } from '../../boxes/searchBox';


/* Function to create an answer node
------------------------------------------------------------ */
export async function editVariant(msg) {


    // Data
    let newVariantName = '';
    const frame = searchBox.frameNamed(msg.frame) as FrameNode;
    const oldVariant = frame.children.find(node => node.name === msg.variant) as InstanceNode;


    // Configuration of the edited variant name
    msg.props.forEach(p => {
        newVariantName = newVariantName + `${p.name}=${p.value}, `;
    });
    newVariantName = newVariantName.slice(0, -2);                     // Removing the last ', '


    // Variant editing
    const newVariant = await searchBox.variantNamed(newVariantName, msg.set) as ComponentNode;
    if (!newVariant) {
        figma.notify('This combination of properties is not supported');
        return;
    }

    oldVariant.swapComponent(newVariant);
    oldVariant.name = newVariantName;


    // Send every created variants in the current page to WizardApp
    sendBox.createdVariants();
}