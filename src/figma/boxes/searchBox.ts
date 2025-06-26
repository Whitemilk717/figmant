/* Functions for searching nodes in Figma canvas
------------------------------------------------------------ */
export const searchBox = {


    // findOne argument functions
    nodeNamed: function (name: string) {

        if (name === 'Bot-icon') {
            return function (node: SceneNode): boolean {
                return (node.name === 'Bot-icon'? true:false);
            }
        }

        if (name === 'Bot-answer') {
            return function (node: SceneNode): boolean {
                return (node.name === 'Bot-answer'? true:false);
            }
        }

        if (name === 'User-icon') {
            return function (node: SceneNode): boolean {
                return (node.name === 'User-icon'? true:false);
            }
        }

        if (name === 'User-question') {
            return function (node: SceneNode): boolean {
                return (node.name === 'User-question'? true:false);
            }
        }

        if (name === 'Chat-box') {
            return function (node: SceneNode): boolean {
                return (node.name === 'Chat-box'? true:false);
            }
        }
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
}