
import { faker } from "@faker-js/faker";
export default (user,count,projectNameIds,teamMemberIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
projectName: projectNameIds[i % projectNameIds.length],
teamMember: teamMemberIds[i % teamMemberIds.length],
role: faker.lorem.sentence(1),
allocation: faker.lorem.sentence(1),
startDate: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
