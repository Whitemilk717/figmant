/* Imports
------------------------------------------------------------ */
import { sendBox } from '../../boxes/sendBox'; 
import { searchBox } from '../../boxes/searchBox';


/* Function to hide some variants
------------------------------------------------------------ */
export async function hideVariants(msg, logsOn) {


    // Data
    const groupedTargets: {
        cleanName: string;          // Variant name without numbering
        targets: InstanceNode[];    // Nodes to hide
        nodes: InstanceNode[];      // Nodes that share the same cleanName
    }[] = [];


    // Initialization of groupedTargets
    for (const v of msg.variants) {
        const variant = searchBox.nodeNamed(v) as InstanceNode;

        const indx = variant.name.indexOf('-');
        const cleanName = variant.name.slice(indx+1);

        const group = groupedTargets.find(g =>
            g.cleanName === cleanName
        );

        if (group) {
            group.targets.push(variant);
        } else {
            groupedTargets.push({
                cleanName: cleanName,
                targets: [variant],
                nodes: await searchBox.homonymousVariants(cleanName)
            });
        }
    }


    // Sending log message about variants hiding BEFORE reordering
    for (const g of groupedTargets) {
        for (const target of g.targets) {
            const componentSet = (await target.getMainComponentAsync()).parent;
            if (logsOn === 'ON') await sendBox.logMsg(`Variant "${target.name}" in frame "${target.parent.name}" from the component set "${componentSet.name}" has been hidden`);
        }
    }


    // Reordering variant numbers after hiding
    groupedTargets.forEach(g => {
        reorder(g);
    });
    

    // Send every created variants in the current page to WizardApp
    sendBox.createdVariants();
}


/* Function to reorder the numbers of a variant group
------------------------------------------------------------ */
function reorder(group) {
    let num = 1;
    let hideNum = 1;

    group.nodes.forEach(n => {

        const instance = n as InstanceNode;

        if (instance.name.includes('hidden')) {
            instance.name = instance.name.replace(instance.name.split('-')[0], String(hideNum));
            hideNum++;
        }
        
        else if (group.targets.find(target => target.name === instance.name)) {
            instance.name = String(hideNum) + '-hidden-' + group.cleanName;
            instance.visible = false;
            hideNum++;
        }
        
        else {
            instance.name = instance.name.replace(instance.name.split('-')[0], String(num));
            num++;
        }

    });
}