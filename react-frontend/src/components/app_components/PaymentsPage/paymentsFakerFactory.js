
import { faker } from "@faker-js/faker";
export default (user,count,clientNameIds,invoiceNoIds,projectNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentNo: faker.lorem.sentence(1),
projectName: faker.lorem.sentence(1),
clientName: clientNameIds[i % clientNameIds.length],
invoiceNo: invoiceNoIds[i % invoiceNoIds.length],
projectName: projectNameIds[i % projectNameIds.length],
paymentDate: faker.lorem.sentence(1),
amount: faker.lorem.sentence(1),
currency: faker.lorem.sentence(1),
paymentMethod: faker.lorem.sentence(1),
referenceNo: faker.lorem.sentence(1),
notes: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
