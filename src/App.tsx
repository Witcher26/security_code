import React, {useEffect} from 'react';
import TreeView from './components/TreeView';
import PropertyTabs from './components/PropertyTabs';
import { useDispatch } from 'react-redux';
import { setNodes } from './redux/treeSlice';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => dispatch(setNodes(data)));
    }, [dispatch]);

    const saveToFile = () => {
      fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
                <TreeView />
                <button onClick={saveToFile}>
                    Save Data
                </button>
            </div>
            <div style={{ width: '50%' }}>
                <PropertyTabs />
            </div>
        </div>
    );
};

export default App;