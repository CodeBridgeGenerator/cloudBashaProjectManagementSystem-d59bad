
import { faker } from "@faker-js/faker";
export default (user,count,clientNoIds,leadNoIds,responsibleToIds,accountableToIds,consultedToIds,informedToIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
clientNo: clientNoIds[i % clientNoIds.length],
leadNo: leadNoIds[i % leadNoIds.length],
opportunityName: faker.lorem.sentence(""),
requestType: faker.lorem.sentence(""),
requestDate: faker.lorem.sentence(""),
contactName: faker.lorem.sentence(""),
responsibleTo: responsibleToIds[i % responsibleToIds.length],
estimatedValue: faker.lorem.sentence(""),
currency: faker.lorem.sentence(""),
stage: faker.lorem.sentence(""),
probability: faker.lorem.sentence(""),
expectedCloseDate: faker.lorem.sentence(""),
outcome: faker.lorem.sentence(""),
nextAction: faker.lorem.sentence(""),
accountableTo: accountableToIds[i % accountableToIds.length],
consultedTo: consultedToIds[i % consultedToIds.length],
informedTo: informedToIds[i % informedToIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
