import { useState } from 'react';
import '../../public/output.css'
import FormDialog from './FormDialog';


export default function Table(props) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <FormDialog
                opened={opened} 
                withCloseButton
                setOpened={setOpened}
                Fname={props.Fname}
                Lname={props.Lname}
                endereco={props.endereco}
                listPeople={props.listPeople}
                setListPeople={props.setListPeople}
                id={props.id}
                />  
            <div className="w-[40%] flex flex-row border-2 justify-center border-solid rounded m-3 p-1 cursor-pointer" onClick={() => setOpened((o) => !o)}>
                <h1 className="">{props.Fname} |  {props.Lname} | {props.endereco}</h1>
            </div>
        </>
    )
}
