
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
smNo: faker.lorem.sentence(1),
serviceName: faker.lorem.sentence(1),
quantity: faker.lorem.sentence(1),
specification: faker.lorem.sentence(1),
costingBasis: faker.lorem.sentence(1),
included: faker.lorem.sentence(1),
billingCycle: faker.lorem.sentence(1),
unitPrice: faker.lorem.sentence(1),
annualAmount: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
