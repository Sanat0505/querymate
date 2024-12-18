const generateWorkflow = (query) => {
    if (query.toLowerCase().includes("onboarding")) {
      return `
        <?xml version="1.0" encoding="UTF-8"?>
        <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definition_1">
          <process id="OnboardingProcess" isExecutable="true">
            <startEvent id="StartEvent_1" name="Start Onboarding"/>
            <sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
            <task id="Task_1" name="Verify Documents"/>
            <sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1"/>
            <endEvent id="EndEvent_1" name="Onboarding Complete"/>
          </process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="OnboardingProcess">
              <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
                <dc:Bounds x="173" y="102" width="36" height="36"/>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
                <dc:Bounds x="260" y="80" width="100" height="80"/>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
                <dc:Bounds x="400" y="102" width="36" height="36"/>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
                <di:waypoint x="209" y="120"/>
                <di:waypoint x="260" y="120"/>
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
                <di:waypoint x="360" y="120"/>
                <di:waypoint x="400" y="120"/>
              </bpmndi:BPMNEdge>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </definitions>`;
    }
    return null;
  };
  