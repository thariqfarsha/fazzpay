const initialState = {
  data: [],
};

const historyNotif = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HISTORY_NOTIF": {
      return {
        data: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default historyNotif;
