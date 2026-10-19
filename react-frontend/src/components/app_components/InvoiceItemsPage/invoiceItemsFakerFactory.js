
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceNo: faker.datatype.number(""),
description: faker.datatype.number(""),
quantity: faker.datatype.number(""),
unit: faker.datatype.number(""),
unitPrice: faker.datatype.number(""),
discount: faker.datatype.number(""),
taxRate: faker.datatype.number(""),
lineAmount: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
