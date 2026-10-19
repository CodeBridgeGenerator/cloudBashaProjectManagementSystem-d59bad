
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
contactName: faker.lorem.sentence(1),
company: faker.lorem.sentence(1),
position: faker.lorem.sentence(1),
email: faker.internet.email(),
phone: faker.lorem.sentence(1),
department: faker.lorem.sentence(1),
primaryContact: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
