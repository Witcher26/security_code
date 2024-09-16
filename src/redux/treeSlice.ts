import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
    properties: { [key: string]: any };
}

interface TreeState {
    nodes: TreeNode[];
    selectedNodeId: string | null;
}

const initialState: TreeState = {
    nodes: [], // Здесь будут загруженные данные
    selectedNodeId: null,
};

function findNodeById(nodes: TreeNode[], id: string): TreeNode | undefined {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const child = findNodeById(node.children, id);
        if (child) {
            return child;
        }
      }
    }
  }

const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {
        setNodes(state, action: PayloadAction<TreeNode[]>) {
            state.nodes = action.payload;
        },
        selectNode(state, action: PayloadAction<string>) {
            state.selectedNodeId = action.payload;
        },
        updateNodeProperties(state, action: PayloadAction<{ id: string, properties: { [key: string]: any } }>) {
            const { id, properties } = action.payload;
            const node = findNodeById(state.nodes, id);
            if (node) {
                node.properties = { ...node.properties, ...properties };
            }
        },
    },
});

export const { setNodes, selectNode, updateNodeProperties } = treeSlice.actions;

export default treeSlice.reducer;