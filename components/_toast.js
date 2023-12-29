import React from 'react'

const ToastNotification = (props) => {
    return (
        <>
            {
                props.title && (
                    <div className="toast toast-end">
                        {
                            props.error ? (
                                <div className="alert alert-warning">
                                    <span>{props.title}</span>
                                </div>
                            ) : (
                                <div className="alert alert-success">
                                    <span>{props.title}</span>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default ToastNotification
