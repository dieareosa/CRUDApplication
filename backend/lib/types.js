const TYPES = {
    BOOLEAN: 'boolean',
    STRING: 'string'
};

const CREATE_TUTORIAL = {
    title: { type: TYPES.STRING, required: true },
    publishedStatus: { type: TYPES.STRING, required: true},
    videoUrl: { type: TYPES.STRING, required: false },
    description: { type: TYPES.STRING, required: false}
};

const UPDATE_TUTORIAL = {
    title: { type: TYPES.STRING, required: false },
    publishedStatus: { type: TYPES.STRING, required: false},
    videoUrl: { type: TYPES.STRING, required: false },
    description: { type: TYPES.STRING, required: false}
};

const GET_TUTORIALS = {
    title: { type: TYPES.STRING, required: false },
    description: { type: TYPES.STRING, required: false}
};

module.exports = { CREATE_TUTORIAL, UPDATE_TUTORIAL, GET_TUTORIALS,  TYPES }