import React, { useState } from "react";
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';
import Axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        Fname: props.Fname,
        Lname: props.Lname,
        endereco: props.endereco,
    });

    const handleChangeValues = (values) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [values.target.id]: values.target.value,
        }));
        
    };

    const handleClose = () => {
        props.setOpened(false);
    };

    const handleEditPerson= () => {
        Axios.put("http://localhost:3000/edit", {
            id: editValues.id,
            Fname: editValues.Fname,
            Lname: editValues.Lname,
            endereco: editValues.endereco,
        }).then(() => {
            
            props.setListPeople(
                props.listPeople.map((value) => {
                    return value.id == editValues.id
                        ? {
                            id: editValues.id,
                            Fname: editValues.Fname,
                            Lname: editValues.Lname,
                            endereco: editValues.endereco,
                        }
                        : value;
                })
            );
        });
        handleClose();
    };

    const handleDeletePerson = () => {
        Axios.delete(`http://localhost:3000/delete/${editValues.id}`).then(() => {
            props.setListPeople(
                props.listPeople.filter((value) => {
                    return value.id != editValues.id;
                })
            );
        });
        handleClose();
    };

    return (
        <Dialog
            opened={props.opened}
            withCloseButton
            onClose={handleClose}
            size="lg"
            radius="md"
            shadow="xl"
            className="dark:bg-slate-700"
        >
            <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                Edit {props.id}
            </Text>
            <Group className="w-full flex flex-col items-center justify-center text-black">
                <TextInput
                    type="text"
                    id="Fname"
                    label="First Name"
                    defaultValue={props.Fname}
                    placeholder={props.Fname}
                    onChange={handleChangeValues} 
                    />
                <TextInput
                    type="text"
                    id="Lname"
                    label="Last Name"
                    defaultValue={props.Lname}
                    placeholder={props.Lname}
                    onChange={handleChangeValues} 
                    
                    />
                <TextInput
                    defaultValue={props.endereco}
                    placeholder={props.endereco} 
                    onChange={handleChangeValues} 
                    type="text"
                    id="endereco"
                    label="Adress"
                    />

                <Group className=" flex flex-rox">
                    <Button onClick={handleEditPerson} className=" bg-slate-500 hover:bg-slate-200">Edit</Button>
                    <Button onClick={handleDeletePerson} className=" bg-slate-500 hover:bg-slate-200 hover:text-black">Delete</Button>
                </Group>
            </Group>
        </Dialog>
    );
}
