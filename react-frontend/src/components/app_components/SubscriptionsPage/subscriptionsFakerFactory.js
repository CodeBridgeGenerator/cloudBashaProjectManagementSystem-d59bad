
import { faker } from "@faker-js/faker";
export default (user,count,clientNameIds,projectNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
subscriptionNo: faker.lorem.sentence(1),
clientName: clientNameIds[i % clientNameIds.length],
projectName: projectNameIds[i % projectNameIds.length],
serviceName: faker.lorem.sentence(1),
provider: faker.lorem.sentence(1),
startDate: faker.lorem.sentence(1),
renewalDate: faker.lorem.sentence(1),
billingCycle: faker.lorem.sentence(1),
cost: faker.lorem.sentence(1),
sellingPrice: faker.lorem.sentence(1),
currency: faker.lorem.sentence(1),
autoRenew: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
