const TYPES = {
    BOOLEAN: 'boolean',
    STRING: 'string',
    URL: 'url'
};

const CREATE_TUTORIAL = {
    title: {type: TYPES.STRING, required: true},
    isPublic: {type: TYPES.BOOLEAN, required: true},
    videoUrl: {type: TYPES.URL, required: false},
    description: {type: TYPES.STRING, required: false}
};

const UPDATE_TUTORIAL = {
    title: {type: TYPES.STRING, required: false},
    isPublic: {type: TYPES.BOOLEAN, required: false},
    videoUrl: {type: TYPES.URL, required: false},
    description: {type: TYPES.STRING, required: false}
};

const GET_TUTORIALS = {
    title: {type: TYPES.STRING, required: false},
    description: {type: TYPES.STRING, required: false}
};

module.exports = {CREATE_TUTORIAL, UPDATE_TUTORIAL, GET_TUTORIALS, TYPES};