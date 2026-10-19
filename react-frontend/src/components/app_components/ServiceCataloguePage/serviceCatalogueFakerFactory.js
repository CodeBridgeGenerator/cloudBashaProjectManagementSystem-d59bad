
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
serviceCode: faker.lorem.sentence(1),
serviceName: faker.lorem.sentence(1),
serviceCategory: faker.lorem.sentence(1),
billingType: faker.lorem.sentence(1),
defaultUnit: faker.lorem.sentence(1),
defaultUnitPrice: faker.lorem.sentence(1),
currency: faker.lorem.sentence(1),
active: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
