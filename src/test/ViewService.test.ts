import {ViewService} from "../main/library/view-services/ViewService";
import {MockCommunicationService} from "./mockups/MockCommunicationService";
import {ViewClient} from "../main/library/view-services/ViewClient";
import {MockElement} from "./mockups/MockElement";

const textElement = new MockElement();
const viewClient = new ViewClient(textElement);
const communicationService = new MockCommunicationService();
const viewService: ViewService = new ViewService(communicationService);

test('Command setText should send event message to client with name send-text and value of sent text.', () => {
    viewService.setText('abc');
    expect(communicationService.sentMessages.length).toEqual(1);
    expect(communicationService.sentMessages[0].name).toEqual('set-text');
    expect(communicationService.sentMessages[0].data).toEqual('abc');
});