
import { faker } from "@faker-js/faker";
export default (user,count,clientNameIds,projectNameIds,assignedToIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
renewalNo: faker.lorem.sentence(""),
renewalType: faker.lorem.sentence(""),
referenceNo: faker.lorem.sentence(""),
clientName: clientNameIds[i % clientNameIds.length],
projectName: projectNameIds[i % projectNameIds.length],
currentEndDate: faker.lorem.sentence(""),
renewalDate: faker.lorem.sentence(""),
renewalAmount: faker.lorem.sentence(""),
currency: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
assignedTo: assignedToIds[i % assignedToIds.length],
notes: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
