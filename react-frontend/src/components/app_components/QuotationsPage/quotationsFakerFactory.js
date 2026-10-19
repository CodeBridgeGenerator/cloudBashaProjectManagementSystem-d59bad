
import { faker } from "@faker-js/faker";
export default (user,count,proposalRefIds,clientIds,attentionToIds,preparedByIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quoteNo: faker.lorem.sentence(1),
proposalRef: proposalRefIds[i % proposalRefIds.length],
client: clientIds[i % clientIds.length],
attentionTo: attentionToIds[i % attentionToIds.length],
projectTitle: faker.lorem.sentence(1),
quoteDate: faker.lorem.sentence(1),
validTillDate: faker.lorem.sentence(1),
paymentTerms: faker.lorem.sentence(1),
paymentMethod: faker.lorem.sentence(1),
preparedBy: preparedByIds[i % preparedByIds.length],
currency: faker.lorem.sentence(1),
subTotal: faker.lorem.sentence(1),
discount: faker.lorem.sentence(1),
taxRate: faker.lorem.sentence(1),
taxAmount: faker.lorem.sentence(1),
finalAmount: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
generatedDoc: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
