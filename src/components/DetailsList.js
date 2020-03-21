import React from 'react'

const DetailsList = props => {
    return (
        <div>
            <ul className="details-list-style">
                {props.charDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
        </div>
    )
}

export default DetailsList;