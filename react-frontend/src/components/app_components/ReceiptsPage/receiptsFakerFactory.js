
import { faker } from "@faker-js/faker";
export default (user,count,paymentNoIds,clientNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
receiptNo: faker.lorem.sentence(1),
paymentNo: paymentNoIds[i % paymentNoIds.length],
clientName: clientNameIds[i % clientNameIds.length],
invoiceNo: faker.lorem.sentence(1),
receiptDate: faker.lorem.sentence(1),
amount: faker.lorem.sentence(1),
currency: faker.lorem.sentence(1),
receiptFile: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
