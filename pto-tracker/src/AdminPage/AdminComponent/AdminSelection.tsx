import { useState } from "react";
import './AdminSelection.css';
import { create } from "domain";
import { Modal } from "react-bootstrap";
import { Button, ModalBody } from "react-bootstrap";

interface AdminSelectionProps {
    handleCreateAccount: () => void;
    handleEditAccount: () => void;
    handleUsername: (value: string | ((prevVar: string) => string)) => void;
    content: { id: string; firstName: string; secondName: string; email: string; password: string; lineManager: string; numberOfHolidays: string}[];
}

const AdminSelction: React.FC<AdminSelectionProps> = ({ handleCreateAccount, handleEditAccount, handleUsername, content}) => {
    const [editRadioButton, setEditRadioButton] = useState(false);
    const [createNewUser, setCreateNewUser] = useState(true);
    const [username, setUsername] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const handleEditRadioButton = () => {
        setEditRadioButton(true);
        setCreateNewUser(false);
        handleEditAccount();
        searchVisible();
        
    };

    const searchVisible = () => {
        const searchBar = document.getElementById('searchBar');
        const searchBtn = document.getElementById('userSearchBtn');
        if (editRadioButton==false) {
            setUsername('');           
            searchBar!.style.visibility = 'visible';
            searchBtn!.style.visibility = 'visible';
        } else {
            setUsername(''); 
            searchBar!.style.visibility = 'hidden';
            searchBtn!.style.visibility = 'hidden';
        }
    }
    
    const handleCreateNewUser = () => {
        setEditRadioButton(false);
        setCreateNewUser(true);
        handleCreateAccount();
        searchVisible();
 
    };    

    const handleUsernameInput = (tempUsername: string) => {
        setUsername(tempUsername);
    }

    const searchUser = () => {
        if (username=="temp") {
            handleUsername(username);
        } else {
            handleShow();
            handleUsername("");
        }
    }

    return (
        <div className="AdminSelection"> 
        <Modal className="modal" show={show} onHide={handleClose}>
                <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title>Search Result</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <a>User "{username}" does not exist</a>
                </ModalBody> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>       
            <h1>Please select an option</h1>
            <label htmlFor="CreateUser">Create a New Account</label><br></br>
            <input defaultChecked type="radio" id="CreateUserBtn" name="optionSelection" value="CreateUser" onClick={ e => {
                handleCreateNewUser();
                
            }}></input>
            <label htmlFor="editUSers">Edit An Existing User</label>
            <input type="radio" id="EditRadioButton" name="optionSelection" value="editUSers" onClick={ e => {
                handleEditRadioButton();
                
            }}></input>
            <p></p>            
            <input className="searchUserField" id="searchBar" type="text" placeholder="Search User"  onChange={ e => {
                handleUsernameInput(e.target.value);
            }}value={username}></input>
    
            <button className="userSearchBtn" id="userSearchBtn" type="button" onClick={ e =>{
                searchUser();
            }}>Search</button>
        </div>
    );
    
};
export default AdminSelction;