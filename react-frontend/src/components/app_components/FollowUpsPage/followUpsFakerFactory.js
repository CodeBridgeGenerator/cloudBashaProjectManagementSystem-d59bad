
import { faker } from "@faker-js/faker";
export default (user,count,assignedToIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
referenceType: faker.lorem.sentence(""),
referenceNo: faker.lorem.sentence(""),
assignedTo: assignedToIds[i % assignedToIds.length],
followUpType: faker.lorem.sentence(""),
subject: faker.lorem.sentence(""),
followUpDate: faker.lorem.sentence(1),
status: faker.lorem.sentence(""),
notes: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
