import React from 'react'

const TodoElement = ({title,id}) => {
    return (
        <div className="p-2 md:p-4 lg:p-6 bg-gradient-to-b from-blue-900 rounded-xl to-sky-950 text-white w-full h-16">
            {title}
        </div>
    )
}
export default TodoElement
