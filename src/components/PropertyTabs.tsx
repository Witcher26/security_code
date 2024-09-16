import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { useDispatch, useSelector } from 'react-redux';
import { updateNodeProperties } from '../redux/treeSlice';
import { RootState } from '../redux/store';

const PropertyTabs: React.FC = () => {
    const dispatch = useDispatch();
    const selectedNodeId = useSelector((state: RootState) => state.tree.selectedNodeId);
    const nodes = useSelector((state: RootState) => state.tree.nodes);
    const selectedNode = nodes.find(node => node.id === selectedNodeId);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (selectedNodeId) {
            dispatch(updateNodeProperties({
                id: selectedNodeId,
                properties: {
                    [key]: e.target.value
                }
            }));
        }
    };

    if (!selectedNode) {
        return null;
    }

    return (
        <TabView>
            <TabPanel header="Basic Info">
                <div>
                    {Object.entries(selectedNode.properties).map(([key, value]) => (
                        <div key={key}>
                            <label>{key}</label>
                            <input type="text" value={value} onChange={(e) => handleChange(e, key)} />
                        </div>
                    ))}
                </div>
            </TabPanel>
        </TabView>
    );
  };

// TODO Покрыть тестами
export default PropertyTabs;