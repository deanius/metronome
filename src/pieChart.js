import React from 'react'
export const PieChart = ({ percentComplete = 0 }) => {
    const portion = (percentComplete % 100) / 100
    const angle = 2 * Math.PI * portion
    const x = -1 * Math.sin(angle)
    const y = Math.cos(angle)
    const flip = portion < 0.5 ? 0 : 1

    //const pathDef = `M 0,0 L 0.01,0.99 A 1,1 0 1 0 0.01,0.99 Z`
    const pathDef = `M 0,0 L 0.001,0.999 A .999,.999 0 ${flip} 1 ${x}, ${y} Z`

    return (
        <svg height="200" width="200" viewBox="0 0 200 200">
            {/* transforms, like functions, are applied right-to-left */}
            <g transform="translate(100, 100) scale(100, -100)">
                <circle fill="#cccccc" cx="0" cy="0" r="0.9" />
                <path fill="#0088cc" d={pathDef} transform="scale(0.8, 0.8)" data={{percentComplete, portion}} />
                <text x="0" y="0"  fill="#000000" font-size="35px">{portion}</text>
            </g>
        </svg>
    )
}
