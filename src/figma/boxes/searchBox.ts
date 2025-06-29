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
        let targetNumber = 1;
        const variables = await figma.variables.getLocalVariablesAsync();
        
        variables.forEach(variable => {
            if (variable.name.includes('Text-var-')) {
                const number = Number(variable.name.split('-').pop())
                if (number == targetNumber) targetNumber++;
            }
        })

        return targetNumber;
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
    variantNamed: async function (variantName, setName) {
        const originalVariant = figma.currentPage.findOne(n =>
            n.name === variantName &&
            n.parent &&
            n.parent.name === setName
            ? true
            : false
        );

        return originalVariant;
    }
}