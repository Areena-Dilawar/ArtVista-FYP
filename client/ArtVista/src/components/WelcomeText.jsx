import React from 'react'
import {motion} from 'framer-motion'

function WelcomeText({title ,subtitle}) {
    return (
        <div className='text-center mt-65 mb-45'>
            <motion.div className=' text-white text-9xl font-serif' initial={{ opacity: 0, y:50 }} animate={{ opacity: 1, y:0 }} transition={{ duration:1, ease:'easeInOut',delay: 0.5 }}>
                <p>{title}</p>
            </motion.div>
            <motion.div className=' text-gray-500 text-xs font-serif tracking-[.80em] ' style={{ wordSpacing: '20px' }} initial={{ opacity: 0, y:50  }} animate={{ opacity: 1, y:0 }} transition={{ duration:1, ease:'easeOut',delay: 1 }}>
                <p>{subtitle}</p>
            </motion.div>
        </div>
    )
}

export default WelcomeText
