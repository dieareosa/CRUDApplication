const _ = require('lodash');
const luxon = require('luxon');
const { TYPES } = require('../lib/types');

const isValidType = (value, type) => {
    switch (type) {
        case TYPES.STRING:
            return _.isString(value);
        case TYPES.BOOLEAN:
            return _.isBoolean(value);
        case TYPES.DATE:
            return _.isString(value) && luxon.DateTime.fromISO(value).isValid;
        default:
            return false;
    }
};

const isNullish = (value) => value === undefined || value === null;

const isValidSchema = (test, expect) => {
    const { isValid, errors } = validateSchema(test, expect);

    return {
        successful: isValid,
        message: errors.join(' ')
    };
};

const validateSchema = (payload, schema) => {
    const result = { isValid: true, errors: [] };

    const payloadKeys = Object.keys(payload);
    const schemaKeys = Object.keys(schema);

    const keysValidation = validateKeys(payloadKeys, schemaKeys, schema);
    if (!keysValidation.isValid) return { isValid: false, errors: keysValidation.errors };

    schemaKeys.forEach(key => {
        const value = payload[key];
        const { type, required } = schema[key];

        if (!required && isNullish(value)) return;

        if (!isValidType(value, type)) {
            result.isValid = false;
            result.errors.push(`${key} is not a valid ${type}`);
        }
    });

    return result;
};

const validateKeys = (payloadKeys, schemaKeys, schema) => {
    const result = { isValid: true, errors: [] };

    const requiredKeys = schemaKeys.filter(key => !!schema[key].required);
    const missingValues = _.differenceWith(requiredKeys, payloadKeys);
    const extraValues = _.differenceWith(payloadKeys, schemaKeys);

    if ([missingValues, extraValues].every(arr => arr.length === 0)) return result;

    result.isValid = false;
    if (missingValues.length > 0) result.errors.push(`These values are missing: ${missingValues.join(', ')}.`);
    if (extraValues.length > 0) result.errors.push(`These values are not supported: ${extraValues.join(', ')}.`);

    return result;
};

module.exports = { isValidSchema }; 