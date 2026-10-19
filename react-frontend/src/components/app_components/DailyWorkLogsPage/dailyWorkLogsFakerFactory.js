
import { faker } from "@faker-js/faker";
export default (user,count,employeeIds,projectNameIds,taskNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
workDate: faker.lorem.sentence(1),
employee: employeeIds[i % employeeIds.length],
projectName: projectNameIds[i % projectNameIds.length],
taskName: taskNameIds[i % taskNameIds.length],
hours: faker.lorem.sentence(1),
workDone: faker.lorem.sentence(1),
blockers: faker.lorem.sentence(1),
nextPlan: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
