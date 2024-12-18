import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

const WorkflowViewer = ({ bpmnXml }) => {
  const modelerRef = useRef();

  useEffect(() => {
    if (!bpmnXml) return;

    // Initialize the BPMN modeler
    const modeler = new BpmnModeler({ container: '#bpmn-container' });
    modelerRef.current = modeler;

    // Import the BPMN XML
    modeler.importXML(bpmnXml, (err) => {
      if (err) {
        console.error('Error importing BPMN XML:', err);
      } else {
        console.log('BPMN diagram rendered successfully!');
      }
    });

    return () => {
      modelerRef.current?.destroy();
    };
  }, [bpmnXml]);

  return <div id="bpmn-container" style={{ width: '100%', height: '500px', border: '1px solid #ccc' }} />;
};

export default WorkflowViewer;
