import { useEffect, useState } from "react";

function Notification(props) {
    const [exit, setExit] = useState(false)
    const [intervalID, setIntervalID] = useState(null)
    const [width, setWidth] = useState(0)

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth(prev => {
                if (prev < 100) {
                    return prev + 0.5;
                }

                clearInterval(id);
                return prev;
            });
        }, 20);

        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 400)
    };

    useEffect(() => {
        if (width === 100) {
            handleCloseNotification()
        }
    }, [width])

    useEffect(() => {
        handleStartTimer()
    }, [])

    return (

        !props.type ?
            (
                <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification ${exit ? "exit" : ""}`} >
                    <div className="notification__title">
                        <h1>{props.title}</h1>
                    </div>
                    <div className="notification__info">
                        <p>{props.message}</p>
                    </div>
                    <div style={{width: `${width}%`}} className="notification__line"></div>
                </div>
            )
            :
            null
    )

}

export default Notification