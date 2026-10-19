
import { faker } from "@faker-js/faker";
export default (user,count,projectNameIds,assignedToIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
taskNo: faker.lorem.sentence(1),
projectName: projectNameIds[i % projectNameIds.length],
taskName: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
assignedTo: assignedToIds[i % assignedToIds.length],
priority: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
startDate: faker.lorem.sentence(1),
dueDate: faker.lorem.sentence(1),
estimatedHours: faker.lorem.sentence(1),
actualHours: faker.lorem.sentence(1),
progress: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
