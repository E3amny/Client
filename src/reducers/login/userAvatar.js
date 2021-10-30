const initialState = {
    userAvatar: "",
};

export const setUserAvatar = (userAvatar) => {
    return {
        type: "SET_USERAVATAR",
        payload: userAvatar,
    };
};

const userAvatar = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_USERAVATAR":
            return { userAvatar: payload };

        default:
            return state;
    }
};

export default userAvatar;