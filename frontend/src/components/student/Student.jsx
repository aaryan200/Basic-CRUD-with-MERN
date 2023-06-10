import { BiEditAlt } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai'

export default function Student({student, handleUpdateClick, handleDelete}) {
    return (
        <div className="min-w-[900px] w-full pt-6 pb-2 flex shadow-custom rounded-lg">
            <div className="flex w-[74%] justify-between items-center">
                <p className='flex flex-1 text-[18px] ml-5 whitespace-nowrap'>{student?.name}</p>
                <p className='flex flex-1 text-[18px] whitespace-nowrap'>{student?.rollNumber}</p>
                <p className='flex flex-1 text-[18px] whitespace-nowrap'>{student?.degree}</p>
                <p className='flex flex-[0.67] text-[18px] whitespace-nowrap'>{student?.grade}</p>
            </div>
            <div className='flex w-[26%] justify-center items-center'>
                <div className='text-[25px] flex gap-3'>
                    <BiEditAlt style={{cursor: "pointer", color: "#668f66"}} onClick={handleUpdateClick}/>
                    <AiFillDelete style={{cursor: "pointer", color: "#cc0606"}} onClick={(e) => handleDelete({e, _id: student._id})}/>
                </div>
            </div>
        </div>
    )
}
