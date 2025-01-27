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
import { useSelector } from "react-redux";

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
        <bpmn:startEvent id="startEvent_1" name="Start Employee Onboarding">
          <bpmn:outgoing>Flow_1</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:task id="task_2" name="Complete necessary paperwork">
          <bpmn:incoming>Flow_1</bpmn:incoming>
          <bpmn:outgoing>Flow_2</bpmn:outgoing>
        </bpmn:task>
        <bpmn:subProcess id="subProcess_3" name="IT Setup">
          
            <bpmn:task id="subProcess_3_SubTask_1" name="Create user account" />
          
            <bpmn:task id="subProcess_3_SubTask_2" name="Connect hardware" />
          
            <bpmn:task id="subProcess_3_SubTask_3" name="Configure email" />
          
        </bpmn:subProcess>
        <bpmn:task id="task_4" name="Departmental Orientation">
          <bpmn:incoming>Flow_3</bpmn:incoming>
          <bpmn:outgoing>Flow_4</bpmn:outgoing>
        </bpmn:task>
        <bpmn:exclusiveGateway id="exclusiveGateway_5" name="Is Orientation Completed?">
          <bpmn:incoming>Flow_4</bpmn:incoming>
          <bpmn:outgoing>Flow_5</bpmn:outgoing>
<bpmn:outgoing>Flow_6</bpmn:outgoing>
        </bpmn:exclusiveGateway>
        <bpmn:task id="task_6" name="Attend training session">
          <bpmn:incoming>Flow_5</bpmn:incoming>
          <bpmn:outgoing>Flow_6</bpmn:outgoing>
        </bpmn:task>
        <bpmn:task id="task_7" name="Submit onboarding feedback">
          <bpmn:incoming>Flow_6</bpmn:incoming>
          <bpmn:outgoing>Flow_7</bpmn:outgoing>
        </bpmn:task>
        <bpmn:endEvent id="endEvent_8" name="Employee Onboarding Complete">
          <bpmn:incoming>Flow_7</bpmn:incoming>
        </bpmn:endEvent><bpmn:sequenceFlow id="Flow_1" sourceRef="[object Object]_1" targetRef="[object Object]_2" /><bpmn:sequenceFlow id="Flow_2" sourceRef="[object Object]_2" targetRef="[object Object]_3" /><bpmn:sequenceFlow id="Flow_3" sourceRef="[object Object]_3" targetRef="[object Object]_4" /><bpmn:sequenceFlow id="Flow_4" sourceRef="[object Object]_4" targetRef="[object Object]_5" /><bpmn:sequenceFlow id="Flow_5" sourceRef="[object Object]_5" targetRef="[object Object]_6" /><bpmn:sequenceFlow id="Flow_6" sourceRef="[object Object]_5" targetRef="[object Object]_7" /><bpmn:sequenceFlow id="Flow_7" sourceRef="[object Object]_6" targetRef="[object Object]_8" /><bpmn:sequenceFlow id="Flow_8" sourceRef="[object Object]_7" targetRef="undefined_9" /><bpmn:sequenceFlow id="Flow_9" sourceRef="[object Object]_8" targetRef="undefined_10" /><bpmn:sequenceFlow id="Flow_10" sourceRef="undefined_9" targetRef="undefined_11" /><bpmn:sequenceFlow id="Flow_11" sourceRef="undefined_10" targetRef="undefined_11" />
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        
      <bpmndi:BPMNShape id="startEvent_1_di" bpmnElement="startEvent_1">
        <dc:Bounds x="150" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="task_2_di" bpmnElement="task_2">
        <dc:Bounds x="300" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="subProcess_3_di" bpmnElement="subProcess_3">
        <dc:Bounds x="450" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="task_4_di" bpmnElement="task_4">
        <dc:Bounds x="600" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="exclusiveGateway_5_di" bpmnElement="exclusiveGateway_5">
        <dc:Bounds x="750" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="task_6_di" bpmnElement="task_6">
        <dc:Bounds x="900" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="task_7_di" bpmnElement="task_7">
        <dc:Bounds x="1050" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="endEvent_8_di" bpmnElement="endEvent_8">
        <dc:Bounds x="1200" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="250" y="140" />
        <di:waypoint x="300" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="400" y="140" />
        <di:waypoint x="450" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="550" y="140" />
        <di:waypoint x="600" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="700" y="140" />
        <di:waypoint x="750" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="850" y="140" />
        <di:waypoint x="900" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="850" y="140" />
        <di:waypoint x="1050" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_7_di" bpmnElement="Flow_7">
        <di:waypoint x="1000" y="140" />
        <di:waypoint x="1200" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_8_di" bpmnElement="Flow_8">
        <di:waypoint x="1150" y="140" />
        <di:waypoint x="1350" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_9_di" bpmnElement="Flow_9">
        <di:waypoint x="1300" y="140" />
        <di:waypoint x="1500" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10_di" bpmnElement="Flow_10">
        <di:waypoint x="1450" y="140" />
        <di:waypoint x="1650" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_11_di" bpmnElement="Flow_11">
        <di:waypoint x="1600" y="140" />
        <di:waypoint x="1650" y="140" />
      </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>`;

const BpmnView = ({bpmnXml}) => {
  const canvasRef = useRef(null);
  const propertiesPanelRef = useRef(null);
  const bpmnModelerRef = useRef(null);
//   const bpmnXml = useSelector((state) => state.data.bpmnXml);
let diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
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

  useEffect(() => {
    const bpmnModeler = new BpmnModeler({
      container: canvasRef.current,
      propertiesPanel: {
        parent: propertiesPanelRef.current,
      },
      additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule],
    });

    bpmnModelerRef.current = bpmnModeler;
    console.log("nnnnnn",bpmnXml)
    // Load initial diagram
    const loadInitialDiagram = async () => {
      try {
        if(bpmnXml === ''){
          await bpmnModeler.importXML(diagramXML);}
        else {
          await bpmnModeler.importXML(bpmnXml);
        }

        console.log('Diagram loaded successfully.');
      } catch (err) {
        console.error('Failed to load initial diagram:', err);
      }
    };

    loadInitialDiagram();

    return () => {
      bpmnModeler.destroy();
    };
  }, [bpmnXml]);

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
      console.log("xmlll",bpmnXml)
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
