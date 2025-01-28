export const generateBPMNXML = (processDescription) => {
  console.log("xmlllll", processDescription);
  const bpmnHeader = `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
    xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
    id="Definitions_1">
    <bpmn:process id="Process_1" isExecutable="true">`;

  const bpmnFooter = `
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        ${generateDiagramElements(processDescription)}
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>`;

  const bpmnElements = processDescription.elements
    .map((element, index) => {
      const id = `${element.type}_${index + 1}`;
      const flowId = `Flow_${index + 1}`;

      switch (element.type) {
        case "startEvent":
          return `
          <bpmn:startEvent id="${id}" name="${element.name}">
            <bpmn:outgoing>${flowId}</bpmn:outgoing>
          </bpmn:startEvent>`;
        case "task":
          return `
          <bpmn:task id="${id}" name="${element.name}">
            <bpmn:incoming>Flow_${index}</bpmn:incoming>
            <bpmn:outgoing>${flowId}</bpmn:outgoing>
          </bpmn:task>`;
        case "exclusiveGateway":
        case "parallelGateway":
        case "inclusiveGateway":
          return `
          <bpmn:${element.type} id="${id}" name="${element.name}">
            <bpmn:incoming>Flow_${index}</bpmn:incoming>
            ${element.outgoing
              .map((out) => `<bpmn:outgoing>Flow_${out}</bpmn:outgoing>`)
              .join("\n")}
          </bpmn:${element.type}>`;
        case "subProcess":
          return `
          <bpmn:subProcess id="${id}" name="${element.name}">
            ${element.elements
              .map(
                (subElement, subIndex) => `
              <bpmn:task id="${id}_SubTask_${subIndex + 1}" name="${subElement.name}" />
            `
              )
              .join("")}
          </bpmn:subProcess>`;
        case "endEvent":
          return `
          <bpmn:endEvent id="${id}" name="${element.name}">
            <bpmn:incoming>Flow_${index}</bpmn:incoming>
          </bpmn:endEvent>`;
        default:
          return "";
      }
    })
    .join("");

  // Validate sequence flows to ensure all references are within bounds
  const validSequenceFlows = processDescription.sequenceFlows.filter((flow) => {
    const isValid =
      processDescription.elements[flow.sourceRef] &&
      processDescription.elements[flow.targetRef];
    if (!isValid) {
      console.error("Invalid flow reference:", flow);
    }
    return isValid;
  });

  const sequenceFlows = validSequenceFlows
    .map(
      (flow, index) => `<bpmn:sequenceFlow id="Flow_${index + 1}" 
        sourceRef="${processDescription.elements[flow.sourceRef].type}_${flow.sourceRef + 1}" 
        targetRef="${processDescription.elements[flow.targetRef].type}_${flow.targetRef + 1}" />`
    )
    .join("");

  return `${bpmnHeader}${bpmnElements}${sequenceFlows}${bpmnFooter}`;
};

function generateDiagramElements(processDescription) {
  const shapes = processDescription.elements
    .map((element, index) => {
      const id = `${element.type}_${index + 1}`;
      const x = 150 + index * 150; // Dynamic X position based on index
      const y = 100; // Fixed Y position for simplicity
      return `
      <bpmndi:BPMNShape id="${id}_di" bpmnElement="${id}">
        <dc:Bounds x="${x}" y="${y}" width="100" height="80" />
      </bpmndi:BPMNShape>`;
    })
    .join("");

  const edges = processDescription.sequenceFlows
    .map((flow, index) => {
      const sourceIndex = flow.sourceRef;
      const targetIndex = flow.targetRef;
      if (
        sourceIndex >= processDescription.elements.length ||
        targetIndex >= processDescription.elements.length
      ) {
        return ""; // Skip invalid flows
      }
      return `
      <bpmndi:BPMNEdge id="Flow_${index + 1}_di" bpmnElement="Flow_${index + 1}">
        <di:waypoint x="${150 + sourceIndex * 150 + 100}" y="140" />
        <di:waypoint x="${150 + targetIndex * 150}" y="140" />
      </bpmndi:BPMNEdge>`;
    })
    .join("");

  return `${shapes}${edges}`;
}
