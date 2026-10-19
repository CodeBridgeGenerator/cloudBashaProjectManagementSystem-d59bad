
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerNo: faker.lorem.sentence(1),
customerName: faker.lorem.sentence(1),
email: faker.internet.email(),
phone: faker.lorem.sentence(1),
customerType: faker.lorem.sentence(1),
productOrService: faker.lorem.sentence(1),
subscriptionStatus: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
