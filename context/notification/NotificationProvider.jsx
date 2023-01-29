import React, { createContext, useContext, useReducer } from "react";
import Notification from "./Notification";
import { v4 } from "uuid";

const NotificationContext = createContext();

const NotificationProvider = (props) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_NOTIFICATION":
                return [...state, { ...action.payload }];
            case "REMOVE_NOTIFICATION":
                return state.filter(x => x.id !== action.id);
            default:
                return state
        }
    }, []);

    return (
        <NotificationContext.Provider value={dispatch}>
            <div className="notification__list">
                {
                    state.map((note) => {
                        return <Notification dispatch={dispatch} key={note.id} {...note} />
                    })
                }
            </div>
            {props.children}
        </NotificationContext.Provider>
    )
};

export const NotificationGet = () => {
    const dispatch = useContext(NotificationContext);

    return (props) => {
        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                id: v4(),
                ...props
            }
        })
    }
}

export default NotificationProvider;