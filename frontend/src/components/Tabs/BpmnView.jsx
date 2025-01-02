// import React, { useEffect, useRef } from "react";
// import "../../assets/styles/style.css";
// import BpmnViewer from "bpmn-js/lib/Modeler";
// import "bpmn-js/dist/assets/diagram-js.css";
// import "bpmn-font/dist/css/bpmn-embedded.css";
// import {BpmnPropertiesPanelModule, BpmnPropertiesProviderModule} from "bpmn-js-properties-panel";
// import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

// const BpmnView = () => {
//   const containerRef = useRef(null);
//   const propViewRef = useRef(null);

//   useEffect(() => {
//     const viewer = new BpmnViewer({
//       container: containerRef.current,
//       keyboard: { bindTo: window },
//       propertiesPanel: { parent: propViewRef.current },
//       additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule],
//       moddleExtensions: { camunda: camundaModdleDescriptor },
//     });

//     const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
//     <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
//       <bpmn:process id="Process_1" isExecutable="false">
//         <bpmn:startEvent id="StartEvent_1"/>
//       </bpmn:process>
//       <bpmndi:BPMNDiagram id="BPMNDiagram_1">
//         <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
//           <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
//             <dc:Bounds x="173" y="102" width="36" height="36"/>
//           </bpmndi:BPMNShape>
//         </bpmndi:BPMNPlane>
//       </bpmndi:BPMNDiagram>
//     </bpmn:definitions>`;

//     viewer.importXML(diagramXML, (err) => {
//       if (err) {
//         console.error("Could not import BPMN diagram. Error:", err);
//       } else {
//         console.log("Diagram imported successfully.");
//         const canvas = viewer.get("canvas");
//         canvas.zoom("fit-viewport");
//       }
//     });

//     return () => {
//       if (viewer) {
//         viewer.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div style={{ height: "100%" }}>
//       <div id="js-canvas" ref={containerRef} style={{ height: "80%" }} />
//       <div id="propview" ref={propViewRef} style={{ height: "20%" }} />
//     </div>
//   );
// };

// export default BpmnView;
import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';

const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_1">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="New Employee Joins">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="Assign Onboarding Buddy">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_2" name="Schedule Welcome Meeting">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:task>
    <bpmn:exclusiveGateway id="Gateway_1" name="Check if Laptop Required">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
      <bpmn:outgoing>Flow_5</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:task id="Task_3" name="Assign Work Laptop">
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_6</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_4" name="Conduct Office Tour">
      <bpmn:incoming>Flow_5</bpmn:incoming>
      <bpmn:incoming>Flow_6</bpmn:incoming>
      <bpmn:outgoing>Flow_7</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1" name="Conclude Onboarding Process">
      <bpmn:incoming>Flow_7</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2" />
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="Gateway_1" />
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="Task_3" />
    <bpmn:sequenceFlow id="Flow_5" sourceRef="Gateway_1" targetRef="Task_4" />
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Task_3" targetRef="Task_4" />
    <bpmn:sequenceFlow id="Flow_7" sourceRef="Task_4" targetRef="EndEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="220" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2">
        <dc:Bounds x="350" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1_di" bpmnElement="Gateway_1">
        <dc:Bounds x="480" y="115" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_3_di" bpmnElement="Task_3">
        <dc:Bounds x="550" y="60" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_4_di" bpmnElement="Task_4">
        <dc:Bounds x="550" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="700" y="130" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="209" y="120" />
        <di:waypoint x="220" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="320" y="120" />
        <di:waypoint x="350" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="450" y="120" />
        <di:waypoint x="480" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="505" y="120" />
        <di:waypoint x="550" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="505" y="120" />
        <di:waypoint x="550" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="650" y="100" />
        <di:waypoint x="650" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_7_di" bpmnElement="Flow_7">
        <di:waypoint x="650" y="220" />
        <di:waypoint x="700" y="140" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const BpmnView = () => {
  const canvasRef = useRef(null);
  const propertiesPanelRef = useRef(null);
  const bpmnModelerRef = useRef(null);

  useEffect(() => {
    const bpmnModeler = new BpmnModeler({
      container: canvasRef.current,
      propertiesPanel: {
        parent: propertiesPanelRef.current,
      },
      additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule],
    });

    bpmnModelerRef.current = bpmnModeler;
    console.log("nnnnnn",diagramXML)
    // Load initial diagram
    const loadInitialDiagram = async () => {
      try {
        await bpmnModeler.importXML(diagramXML);
        console.log('Diagram loaded successfully.');
      } catch (err) {
        console.error('Failed to load initial diagram:', err);
      }
    };

    loadInitialDiagram();

    return () => {
      bpmnModeler.destroy();
    };
  }, []);

  const createNewDiagram = async () => {
    const newDiagramXML = `<?xml version="1.0" encoding="UTF-8"?>
      <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
        xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
        xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        id="Definitions_1" 
        targetNamespace="http://bpmn.io/schema/bpmn">
        <bpmn:process id="Process_1" isExecutable="false">
          <bpmn:startEvent id="StartEvent_1"/>
        </bpmn:process>
        <bpmndi:BPMNDiagram id="BPMNDiagram_1">
          <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
            <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
              <dc:Bounds x="173" y="102" width="36" height="36"/>
            </bpmndi:BPMNShape>
          </bpmndi:BPMNPlane>
        </bpmndi:BPMNDiagram>
      </bpmn:definitions>`;
    try {
      await bpmnModelerRef.current.importXML(newDiagramXML);
      console.log('New diagram created successfully.');
    } catch (err) {
      console.error('Error creating new diagram:', err);
    }
  };

  const downloadDiagram = async (type) => {
    try {
      const { svg } = await bpmnModelerRef.current.saveSVG();
      const { xml } = await bpmnModelerRef.current.saveXML({ format: true });

      if (type === 'bpmn') {
        const blob = new Blob([xml], { type: 'application/bpmn20-xml;charset=UTF-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'diagram.bpmn';
        link.click();
      } else if (type === 'svg') {
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=UTF-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'diagram.svg';
        link.click();
      }
    } catch (err) {
      console.error('Error exporting diagram:', err);
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <div
        id="js-canvas"
        ref={canvasRef}
        style={{ width: '70%', height: '80%', float: 'left', border: '1px solid #ccc' }}
      />
      <div
        id="js-properties-panel"
        ref={propertiesPanelRef}
        style={{ width: '30%', height: '80%', float: 'left', border: '1px solid #ccc' }}
      />
      <div style={{ clear: 'both', padding: '10px' }} 
        className = "flex gap-2"
      >
        <button onClick={createNewDiagram} 
          className="mt-4 p-4 bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 text-center"
        >Create New Diagram</button>
        <button onClick={() => downloadDiagram('bpmn')}
          className="mt-4 p-4 bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 text-center"
            >Download BPMN</button>
        <button onClick={() => downloadDiagram('svg')} 
          className="mt-4 p-4 bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg py-2 text-center" 
            >Download SVG</button>
      </div>
    </div>
  );
};

export default BpmnView;
