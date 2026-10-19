
import { faker } from "@faker-js/faker";
export default (user,count,companyIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
clientNo: faker.lorem.sentence(""),
company: companyIds[i % companyIds.length],
primaryContact: faker.lorem.sentence(""),
email: faker.lorem.sentence(""),
phone: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
