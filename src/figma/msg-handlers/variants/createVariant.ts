/* Imports
------------------------------------------------------------ */
import { sendBox } from '../../boxes/sendBox'; 
import { searchBox } from '../../boxes/searchBox';


/* Function to create an answer node
------------------------------------------------------------ */
export async function createVariant(msg) {


    // Data
    let variantName = '';
    const set = figma.currentPage.findOne(searchBox.setNamed(msg.set)) as ComponentSetNode;
    const frame = figma.currentPage.findOne(searchBox.frameNamed(msg.frame)) as FrameNode;
    
    
    // Configuration of the variant name
    msg.props.forEach(p => {
        variantName = variantName + `${p.name}=${p.value}, `;
    });
    variantName = variantName.slice(0, -2);                     // Removing the last ', '


    // Variant creation
    const variant = set.children.find(searchBox.nodeNamed(variantName)) as ComponentNode;
    const newVariant = variant.createInstance();
    frame.appendChild(newVariant);
}