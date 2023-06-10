import { AiOutlineUserAdd, AiTwotoneSave } from 'react-icons/ai';
import { useState } from "react";
// import axios from "axios";

export default function DataForm({ heading, buttonContent, saveContent = true, formValues, handleSubmit, studentId = null }) {
    const [name, setName] = useState(formValues?.name);
    const [rollNum, setRollNum] = useState(formValues?.rollNumber);
    const [deg, setDeg] = useState(formValues?.degree);
    const [grade, setGrade] = useState(formValues?.grade);

    return (
        <div className='flex flex-col items-center gap-7 w-full  pb-4 pt-2 rounded-[1rem] bg-[#f7f7f7]'>
            <h1 className='font-bold text-5xl text-[#565656] mt-2'>{heading}</h1>
            <form onSubmit={(e) => {
                if (!saveContent) {
                    setName("");
                    setRollNum("");
                    setDeg("");
                    setGrade("");
                }
                return handleSubmit({ e, newValues: { name, rollNumber: rollNum, degree: deg, grade }, _id: studentId });
            }}
            >
                <div className='flex flex-col items-center gap-5'>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='border-0 outline-none bg-[#e7e7e7] p-3 rounded-md text-base placeholder:text-[#666666] focus:border focus:border-blue-500 focus:bg-white focus:text-black focus:placeholder:text-gray-400' required />
                    <input type="text" value={rollNum} onChange={(e) => setRollNum(e.target.value)} placeholder='Roll Number' className='border-0 outline-none bg-[#e7e7e7] p-3 rounded-md text-base placeholder:text-[#666666] focus:border focus:border-blue-500 focus:bg-white focus:text-black focus:placeholder:text-gray-400' required />
                    <input type="text" value={deg} onChange={(e) => setDeg(e.target.value)} placeholder='Degree' className='border-0 outline-none bg-[#e7e7e7] p-3 rounded-md text-base placeholder:text-[#666666] focus:border focus:border-blue-500 focus:bg-white focus:text-black focus:placeholder:text-gray-400' required />
                    <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder='Grade' className='border-0 outline-none bg-[#e7e7e7] p-3 rounded-md text-base placeholder:text-[#666666] focus:border focus:border-blue-500 focus:bg-white focus:text-black focus:placeholder:text-gray-400' required />
                    <button type="submit" className="px-4 py-2 flex justify-between items-center bg-blue-500 text-white text-[1.2rem] rounded-lg">
                        {saveContent ? (
                            <AiTwotoneSave style={{ marginRight: "9px" }} />
                        ) :
                            (
                                <AiOutlineUserAdd style={{ marginRight: "9px" }} />
                            )}
                        {buttonContent}
                    </button>
                </div>
            </form>
        </div>
    )
}
