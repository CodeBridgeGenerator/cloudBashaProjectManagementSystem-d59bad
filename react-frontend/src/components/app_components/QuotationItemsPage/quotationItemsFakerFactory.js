
import { faker } from "@faker-js/faker";
export default (user,count,quoteNoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quoteNo: quoteNoIds[i % quoteNoIds.length],
category: faker.lorem.sentence(1),
serviceName: faker.lorem.sentence(1),
quantity: faker.lorem.sentence(1),
unit: faker.lorem.sentence(1),
detailDescription: faker.lorem.sentence(1),
specification: faker.lorem.sentence(1),
included: faker.lorem.sentence(1),
unitPrice: faker.lorem.sentence(1),
amount: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
