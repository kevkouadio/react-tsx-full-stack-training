import * as React from 'react';
import { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import { AppService } from '../service/backenApi';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import MaterialTable from 'material-table';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
    root: {
        width: '100%'

    },
});

interface Row {
    first_name: string
    last_name: string
    age: number
    course: string
}

export default function ShowUser() {
    const [users, setUsers] = useState<Row[]>([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<Row | null>(null);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [age, setAge] = React.useState(0);
    const [course, setCourse] = React.useState("");

    const handleClickOpen = (row: Row | Row[]) => {
        if (Array.isArray(row)) {
            // handle multiple rows
        } else {
            setSelectedRow(row);
            setFirstName(row.first_name);
            setLastName(row.last_name);
            setAge(row.age);
            setCourse(row.course);
            setOpen(true);
        }
    };
    

    const handleClose = () => {
        setOpen(false);
    };

    function GetUser() {
        AppService.getUsers()
            .then(res =>
                setUsers(res)
            )
            .catch(err => console.log(err));
    }

    function AddUser(newUser: any) {
        AppService.addUser(newUser)
            .then(res => {
                GetUser()
            })
            .catch(err => console.log(err));
    }

    function UpdateUser(updatedUser: any) {
        AppService.updateUser(updatedUser)
            .then(res => {
                GetUser()
            })
            .catch(err => console.log(err));
    }

    function DeleteUser(userId: any) {
        AppService.deleteUser(userId)
            .then(res => {
                GetUser()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        GetUser()
    }, [])

    const columns: any = [
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
        { title: "Age", field: "age", type: "numeric" },
        { title: "Course", field: "course" },
    ];

    return (
        <>
            <MaterialTable
                title="List of users"
                columns={columns}
                data={users}
                options={{
                    actionsColumnIndex: -1
                }}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Update table information',
                        onClick: (event, rowData) => handleClickOpen(rowData),
                    },
                    // {
                    //     icon: 'delete',
                    //     tooltip: 'Update table information',
                    //     onClick: (event, rowData) => DeleteUser(rowData),
                    // },
                ]}
            editable={{
                // onRowAdd: newUser =>
                //     new Promise((resolve: any, reject) => {
                //         setTimeout(() => {
                //             AddUser(newUser)
                //             resolve();
                //         }, 1000)
                //     }),
                // onRowUpdate: (newUser) =>
                //     new Promise((resolve: any, reject) => {
                //         setTimeout(() => {
                //             UpdateUser(newUser)
                //             resolve();
                //         }, 1000)
                //     }),
                onRowDelete: (oldData: any) =>
                    new Promise((resolve: any, reject) => {
                        setTimeout(() => {
                            const Id = oldData.id
                            DeleteUser(Id)
                            resolve()
                        }, 1000)
                    }),
            }}

            />
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">Update Row</DialogTitle>
                <DialogContent>
                    {selectedRow ? (
                        <DialogContentText id="dialog-description">
                            First Name:
                            <TextField
                                autoFocus
                                id="first_name"
                                type="text"
                                defaultValue={selectedRow.first_name}
                                variant="standard"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            Last Name:
                            <TextField
                                autoFocus
                                id="last_name"
                                type="text"
                                defaultValue={selectedRow.last_name}
                                variant="standard"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            Age:
                            <TextField
                                autoFocus
                                id="age"
                                type="number"
                                defaultValue={selectedRow.age}
                                variant="standard"
                                onChange={(event) => setAge(Number(event.target.value))}
                            />
                            Course:
                            <TextField
                                autoFocus
                                id="course"
                                type="text"
                                defaultValue={selectedRow.course}
                                variant="standard"
                                onChange={(event) => setCourse(event.target.value)}
                            />
                        </DialogContentText>
                    ) : (
                        <DialogContentText id="dialog-description">
                            No row selected
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        if (selectedRow) {
                            const updatedUser = {
                                ...selectedRow,
                                first_name: firstName,
                                last_name: lastName,
                                age: age,
                                course: course
                            };
                            UpdateUser(updatedUser);
                            handleClose();
                        }
                    }} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
