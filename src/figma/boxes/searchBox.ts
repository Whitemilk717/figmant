/* Functions for searching nodes in Figma canvas
------------------------------------------------------------ */
export const searchBox = {


    // chatbox findOne argument functions
    nodeNamed: function (name: string) {
        return figma.currentPage.findOne(n => n.name === name);
    },


    // Function to search for a new component number
    nextCompNum: function (chatBox: FrameNode, childName: string) {
        let newNum = 1;
        
        chatBox.children.forEach(child => {
            if (child.name.includes(childName)) {
                let number = Number(child.name.split('-').pop());
                if (number == newNum) newNum++;
            }
        });

        return newNum;
    },


    // Function to search for a new variable number
    nextVarNum: async function () {
        let newNum = 1;
        const variables = await figma.variables.getLocalVariablesAsync();
        
        variables.forEach(variable => {
            if (variable.name.includes('Text-var-')) {
                const number = Number(variable.name.split('-').pop())
                if (number == newNum) newNum++;
            }
        })

        return newNum;
    },


    // function to search a named frame node
    frameNamed: function (name: string) {
        return figma.currentPage.findOne(n => 
            n.type === 'FRAME' &&
            n.name === name
        )
    },


    // function to search a named component set node
    setNamed: function (name: string) {
        return figma.currentPage.findOne(n => 
            n.type === 'COMPONENT_SET' &&
            n.name === name
        )
    },


    // function to search an original available variant (child of the right component set)
    variantNamed: function (variantName, setName) {
        const originalVariant = figma.currentPage.findOne(n =>
            n.name === variantName &&
            n.parent &&
            n.parent.name === setName
            ? true
            : false
        );

        return originalVariant;
    },


    // Function to search for a new variant number
    nextVariantNum: function (name) {
        let newNum = 1;

        const instances = figma.currentPage.findAll(n => n.type === 'INSTANCE') as InstanceNode[];
        
        instances.forEach(instance => {
            if (
                instance.name.includes(name) &&
                !instance.name.includes('-hidden-')
            ) {
                const indx = instance.name.indexOf('-');
                let num = Number(instance.name.slice(0, indx));
                if (num == newNum) newNum++;
            }
        });

        return (String(newNum) + '-');
    },


    // Function to search every variant with the same name
    homonymousVariants: async function (cleanName) {
        
        const nodes = figma.currentPage.findAll(
            n => n.type === 'INSTANCE' &&
            n.name.includes(cleanName)                  // Same name => property values
        ) as InstanceNode[];
        
        return nodes;
    },


    // Function to search every variant (not hidden) that need to be reordered (the number in its name)
    variantsToReorder: function (cleanName) {
        const group = figma.currentPage.findAll(
            n => n.name.includes(cleanName) && 
            n.type === 'INSTANCE' && 
            !n.name.includes('-hidden-')
        );

        return group;
    }
}