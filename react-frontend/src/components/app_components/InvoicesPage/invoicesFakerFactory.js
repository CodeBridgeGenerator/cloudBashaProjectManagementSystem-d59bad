
import { faker } from "@faker-js/faker";
export default (user,count,clientNameIds,projectNameIds,quoteNoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceNo: faker.lorem.sentence(1),
clientName: clientNameIds[i % clientNameIds.length],
projectName: projectNameIds[i % projectNameIds.length],
quoteNo: quoteNoIds[i % quoteNoIds.length],
milestone: faker.lorem.sentence(1),
invoiceDate: faker.lorem.sentence(1),
dueDate: faker.lorem.sentence(1),
currency: faker.lorem.sentence(1),
subTotal: faker.lorem.sentence(1),
discount: faker.lorem.sentence(1),
taxRate: faker.lorem.sentence(1),
taxAmount: faker.lorem.sentence(1),
totalAmount: faker.lorem.sentence(1),
paidAmount: faker.lorem.sentence(1),
balance: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
