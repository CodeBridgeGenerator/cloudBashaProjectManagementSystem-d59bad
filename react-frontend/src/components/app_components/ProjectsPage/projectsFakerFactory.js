
import { faker } from "@faker-js/faker";
export default (user,count,clientIds,proposalRefIds,quoteNoIds,projectManagerIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
projectNo: faker.datatype.number(""),
client: clientIds[i % clientIds.length],
proposalRef: proposalRefIds[i % proposalRefIds.length],
quoteNo: quoteNoIds[i % quoteNoIds.length],
projectName: faker.datatype.number(""),
projectManager: projectManagerIds[i % projectManagerIds.length],
startDate: faker.datatype.number(""),
targetEndDate: faker.datatype.number(""),
projectValue: faker.datatype.number(""),
currency: faker.datatype.number(""),
phase: faker.datatype.number(""),
status: faker.datatype.number(""),
progress: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
