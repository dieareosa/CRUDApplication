
const { isValidSchema } = require('../lib/helpers');
const { CREATE_TUTORIAL, UPDATE_TUTORIAL, GET_TUTORIALS } = require('../lib/types');

const isValidAddTutorialRequest = (tutorial) => {
    const { successful: validSchema, message: schemaMessage } = isValidSchema(tutorial, CREATE_TUTORIAL);

    if (!validSchema) return { successful: false, message: schemaMessage };

    return { successful: true };
};

const isValidIdRequest = (id) => {
    if (!id) return { successful: false, message: 'Invalid Id.' };

    return { successful: true };
};

const isValidUpdateTutorialRequest = (id, tutorial) => {
    if (!id) return { successful: false, message: 'Invalid Id.' };
    const { successful: validSchema, message: schemaMessage } = isValidSchema(tutorial, UPDATE_TUTORIAL);

    if (!validSchema) return { successful: false, message: schemaMessage };

    return { successful: true };
};

module.exports = { isValidAddTutorialRequest, isValidIdRequest, isValidUpdateTutorialRequest }
