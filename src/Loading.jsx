import React from 'react'

import classess from './Index.module.css'
function Loading() {
    return (
        <div className={classess.loading}>
            <div className={classess.loading_ring}>
                
            </div>
            <div className={classess.loading_progress}>Loading...</div>
        </div>
    )
}

export default Loading
