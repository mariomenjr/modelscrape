const modelscrape = require(`../app`);

expect.extend({
    ofTypeArray: (received) => {
        const isArray = Array.isArray(received);
        return {
            message: () =>
                `${isArray ? `Passed` : `Not Passed`}. Found ${1} items.`,
            pass: isArray,
        };
    },
});

test(`A google search for "pupusas"`, async function () {
    await expect(modelscrape()).resolves.ofTypeArray();
});
