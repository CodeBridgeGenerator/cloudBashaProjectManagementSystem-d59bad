
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
pricingNo: faker.lorem.sentence(""),
productCode: faker.lorem.sentence(""),
productName: faker.lorem.sentence(""),
category: faker.lorem.sentence(""),
pricingType: faker.lorem.sentence(""),
unit: faker.lorem.sentence("8"),
costPrice: faker.lorem.sentence(""),
sellingPrice: faker.lorem.sentence(""),
currency: faker.lorem.sentence(""),
billingCycle: faker.lorem.sentence(""),
effectiveFrom: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
notes: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
