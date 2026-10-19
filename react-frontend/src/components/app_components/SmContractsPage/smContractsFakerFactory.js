
import { faker } from "@faker-js/faker";
export default (user,count,clientNameIds,projectNameIds,quoteNoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
sMNo: faker.lorem.sentence(1),
clientName: clientNameIds[i % clientNameIds.length],
projectName: projectNameIds[i % projectNameIds.length],
quoteNo: quoteNoIds[i % quoteNoIds.length],
agreementTitle: faker.lorem.sentence(1),
startDate: faker.lorem.sentence(1),
endDate: faker.lorem.sentence(1),
contractPeriod: faker.lorem.sentence(1),
paymentTerms: faker.lorem.sentence(1),
currency: faker.lorem.sentence(1),
subTotal: faker.lorem.sentence(1),
taxRate: faker.lorem.sentence(1),
finalAmount: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
nextRenewalDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
