import Student from '../../components/student/Student';
import { useState, useEffect } from "react";
import DataForm from '../../components/dataForm/DataForm';
import axios from "axios";
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function Students() {
    const [updateMode, setUpdateMode] = useState(false);
    const [studentsList, setStudentsList] = useState([]);
    const [clickedStudent, setClickedStudent] = useState({});
    const [deleteMode, setDeleteMode] = useState(false);
    const [clickedId, setClickedId] = useState("");

    useEffect(() => {
        if (updateMode) {
            const modal = document.querySelector('.update-modal');
            document.body.style.overflowY = "hidden";
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    setUpdateMode(false);
                }
            })
        }
        else {
            document.body.style.overflowY = "initial";
        }
    }, [updateMode]);

    useEffect(() => {
        if (deleteMode) {
            const modal = document.querySelector('.delete-modal');
            document.body.style.overflowY = "hidden";
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    setDeleteMode(false);
                }
            })
        }
        else document.body.style.overflowY = "initial";
    }, [deleteMode]);

    const getPost = async () => {
        const res = await axios.get("/students/");
        // console.log(res.data);
        setStudentsList(res.data);
    }

    useEffect(() => {
        getPost();
    }, []);

    const handleCreate = async ({ e, newValues, _ }) => {
        e.preventDefault();
        // console.log(newValues);
        try {
            await axios.post("/students/", newValues);
            getPost();
            // console.log("Created");
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async ({ e, newValues, _id }) => {
        e.preventDefault();
        try {
            await axios.put(`/students/${_id}`, newValues);
            setUpdateMode(false);
            getPost();
        } catch (err) {
            console.log(err);
        }
    }

    const handleYesDelete = async ({ e }) => {
        e.preventDefault();
        try {
            await axios.delete(`/students/${clickedId}`);
            setDeleteMode(false);
            getPost();
        } catch (err) {
            console.log(err);
        }
    }

    const handleNoDelete = async ({ e }) => {
        e.preventDefault();
        setDeleteMode(false);
    }

    const handleDelete = async ({ e, _id }) => {
        e.preventDefault();
        setClickedId(_id);
        setDeleteMode(true);
    }

    const handleClose = (e) => {
        e.preventDefault();
        setClickedStudent({});
        setUpdateMode(false);
        // console.log(updateMode);
    }
    //w-[60%]
    return (
        <div className='m-0 bg-[#d6dede] h-full w-full min-w-[100vw] min-h-[100vh] font-body'>
            <div className="w-full max-w-[1040px] mx-auto pt-[4rem] flex flex-col items-center">
                <DataForm
                    heading="Students"
                    buttonContent="ADD"
                    saveContent={false}
                    handleSubmit={handleCreate}
                />
                <div className='mb-10'></div>
                <div className='students-list flex flex-col bg-[#f7f7f7] w-full rounded-[0.75rem] py-2'>
                    <div className='min-w-[693px] flex justify-between w-[77%] mb-3'>
                        <h1 className='heading flex flex-1 font-bold text-2xl text-[1.6rem] text-[#4b4b4b] ml-5 whitespace-nowrap'>Name</h1>
                        <h1 className='heading flex flex-1 font-bold text-2xl text-[1.6rem] text-[#4b4b4b] whitespace-nowrap'>Roll Number</h1>
                        <h1 className='heading flex flex-1 font-bold text-2xl text-[1.6rem] text-[#4b4b4b] whitespace-nowrap'>Degree</h1>
                        <h1 className='heading flex flex-1 font-bold text-2xl text-[1.6rem] text-[#4b4b4b] whitespace-nowrap'>Grade</h1>
                    </div>
                    <hr />
                    {studentsList.map((student) => (
                        <Student
                            student={student}
                            handleDelete={handleDelete}
                            handleUpdateClick={() => {
                                setClickedStudent(student);
                                setUpdateMode(true);
                                // console.log(updateMode);
                            }}
                            key={student._id}
                        />
                    ))}
                </div>
            </div>
            {updateMode ? (
                <div className='update-modal w-full h-full z-10 fixed left-0 top-0 bg-[#00000078] flex justify-center'>
                    <div className='w-[100%]  scale-up-center max-w-[720px] my-auto flex flex-col rounded-[1rem]'>
                        <DataForm
                            heading="Edit Info"
                            buttonContent="SAVE"
                            formValues={{
                                name: clickedStudent?.name,
                                rollNumber: clickedStudent?.rollNumber,
                                degree: clickedStudent?.degree,
                                grade: clickedStudent?.grade
                            }
                            }
                            handleSubmit={handleUpdate}
                            studentId={clickedStudent._id}
                        />
                    </div>
                    <div className='cursor-pointer absolute top-10 right-10 md:right-5 text-[2rem] text-[#bd0d0d] bg-[#bababa] hover:text-[red] hover:bg-white'>
                        <AiOutlineCloseCircle onClick={(e) => handleClose(e)} />
                    </div>
                </div>
            ) :
                (
                    <></>
                )}
            {deleteMode ?
                (
                    <div className='delete-modal w-full h-full z-20 fixed left-0 top-0 bg-[#00000078] flex justify-center min-h-screen'>
                        <div className='w-[100%] scale-up-center max-w-[500px] my-auto flex flex-col rounded-[1rem] bg-[#f7f7f7] items-center min-h-[130px] justify-between'>
                            <p className='text-2xl text-[#565656] mt-2'>Are you sure ?</p>
                            <div className='flex justify-evenly w-full mb-2'>
                                <button onClick={(e) => handleYesDelete({ e })} className='px-6 py-2 bg-red-500 text-[#e2e2e2] text-[1.2rem] rounded-md hover:bg-red-600 hover:text-white'>Yes</button>
                                <button onClick={(e) => handleNoDelete({ e })} className='px-6 py-2 bg-green-500 text-[1.2rem] text-[#e2e2e2] rounded-md hover:bg-green-600 hover:text-white'>No</button>
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
        </div>
    )
}
