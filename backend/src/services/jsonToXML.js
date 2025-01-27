const generateBpmnXml = (bpmnStructure) => {
    const { elements, connections } = bpmnStructure;
  
    // Generate XML for elements
    const elementsXml = elements
      .map((el) => {
        if (el.type === "startEvent") {
          return `<bpmn:startEvent id="${el.name.replace(/\s+/g, "_")}" name="${el.name}" />`;
        } else if (el.type === "task") {
          return `<bpmn:task id="${el.name.replace(/\s+/g, "_")}" name="${el.name}" />`;
        } else if (el.type === "endEvent") {
          return `<bpmn:endEvent id="${el.name.replace(/\s+/g, "_")}" name="${el.name}" />`;
        }
      })
      .join("\n");
  
    // Generate XML for connections
    const connectionsXml = connections
      .map((conn) => {
        return `<bpmn:sequenceFlow id="${conn.source.replace(/\s+/g, "_")}_to_${conn.target.replace(
          /\s+/g,
          "_"
        )}" sourceRef="${conn.source.replace(/\s+/g, "_")}" targetRef="${conn.target.replace(/\s+/g, "_")}" />`;
      })
      .join("\n");
  
    // Combine elements and connections into a BPMN XML definition
    return `
      <?xml version="1.0" encoding="UTF-8"?>
      <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="Definitions_1">
        <bpmn:process id="Process_1" isExecutable="true">
          ${elementsXml}
          ${connectionsXml}
        </bpmn:process>
      </bpmn:definitions>
    `;
  };
  
  // Example 
  const bpmnStructure = {
    elements: [
      { type: "startEvent", name: "New Employee Joins" },
      { type: "task", name: "Assign Onboarding Buddy" },
      { type: "task", name: "Schedule Welcome Meeting" },
      { type: "task", name: "Check Laptop Requirement" },
      { type: "task", name: "Assign Laptop" },
      { type: "task", name: "Buddy Completes Introductory Tour" },
      { type: "endEvent", name: "Conclude Onboarding Process" },
    ],
    connections: [
      { source: "New Employee Joins", target: "Assign Onboarding Buddy" },
      { source: "Assign Onboarding Buddy", target: "Schedule Welcome Meeting" },
      { source: "Schedule Welcome Meeting", target: "Check Laptop Requirement" },
      { source: "Check Laptop Requirement", target: "Assign Laptop" },
      { source: "Assign Laptop", target: "Buddy Completes Introductory Tour" },
      { source: "Buddy Completes Introductory Tour", target: "Conclude Onboarding Process" },
    ],
  };
  
  const bpmnXml = generateBpmnXml(bpmnStructure);
  console.log(bpmnXml);
  