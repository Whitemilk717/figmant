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
    oldVariant.name = '0-' + newVariantName; // The number inserted is there only to let the reorder function to work


    // Reordering of the variants belonging to the old and modified group
    let indx = msg.variant.indexOf('-');
    const oldCleanName = msg.variant.slice(indx+1);                                                                     // Old variant name without without numbering
    const oldVariantsGroup = figma.currentPage.findAll(n => n.name.includes(oldCleanName) && n.type === 'INSTANCE');
    reorder(oldVariantsGroup);

    indx = newVariantName.indexOf('-');
    const newCleanName = newVariantName.slice(indx+1);                                                                  // New variant name without without numbering
    const editedVariantsGroup = figma.currentPage.findAll(n => n.name.includes(newCleanName) && n.type === 'INSTANCE');
    reorder(editedVariantsGroup);


    // Send every created variants in the current page to WizardApp
    sendBox.createdVariants();
}


/* Function to reorder the numbers of a variant group
------------------------------------------------------------ */
function reorder(group) {
    let num = 1;

    group.forEach(n => {
        n.name = n.name.replace(n.name.split('-')[0], String(num));
        num++;
    });
}