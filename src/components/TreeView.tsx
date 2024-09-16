import React from 'react';
import { Tree } from 'primereact/tree';
import { useDispatch, useSelector } from 'react-redux';
import { selectNode } from '../redux/treeSlice';
import { RootState } from '../redux/store';

const TreeView: React.FC = () => {
    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.tree.nodes);

    const onNodeSelect = (e: any) => {
        dispatch(selectNode(e.node.id));
    };

    return <Tree value={nodes} onSelect={onNodeSelect} />;
};

// TODO Покрыть тестами
export default TreeView;