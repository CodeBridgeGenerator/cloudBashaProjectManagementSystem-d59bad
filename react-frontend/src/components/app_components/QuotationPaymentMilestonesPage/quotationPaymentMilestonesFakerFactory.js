
import { faker } from "@faker-js/faker";
export default (user,count,quoteNoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quoteNo: quoteNoIds[i % quoteNoIds.length],
milestone: faker.lorem.sentence(1),
percentage: faker.lorem.sentence(1),
beforeTaxAmount: faker.lorem.sentence(1),
afterTaxAmount: faker.lorem.sentence(1),
paymentTerms: faker.lorem.sentence(1),
sequence: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
