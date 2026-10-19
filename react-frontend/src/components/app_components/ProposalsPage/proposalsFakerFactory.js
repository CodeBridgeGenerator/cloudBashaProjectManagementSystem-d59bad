
import { faker } from "@faker-js/faker";
export default (user,count,leadNoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
proposalRef: faker.lorem.sentence(1),
leadNo: leadNoIds[i % leadNoIds.length],
projectTitle: faker.lorem.sentence(1),
proposalDate: faker.lorem.sentence(1),
validTillDate: faker.lorem.sentence(1),
scopeSummary: faker.lorem.sentence(1),
estimatedAmount: faker.lorem.sentence(1),
currency: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
generatedDoc: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
