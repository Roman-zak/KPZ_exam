import React, { useState, useEffect, Component } from "react";
import { Button, ButtonGroup, Container, Table, Form, FormGroup, InputGroup, FormLabel } from 'react-bootstrap';

export default function Therapists() {
    const [therapists,setTherapists] = useState([]);
    const [editTherapist,setEditTherapist] = useState({    
    "id": 0,
    "name": "",
    "syrname": "",
    "roomId": 0
    });
    useEffect(()=>{
        fetchData().catch(console.error);
    },[]);
    const  remove = async (id) =>{
        console.log(id);
        await fetch(`https://localhost:7126/api/Therapists/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }}).then(() => {
            let updatedTherapists = therapists.filter(i => i.id !== id);
            setTherapists(updatedTherapists);
        });
    }
    const handleSave = (event) => {
        event.preventDefault();
        const therapistToSave = editTherapist;
        therapistToSave.id=0;
        setEditTherapist(therapistToSave);
        console.log(editTherapist);
        console.log(JSON.stringify(editTherapist).replace("null","[]"));
         fetch('https://localhost:7126/api/Therapists', {
            method:  'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editTherapist).replace("null","[]"),
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }});
        setEditTherapist({
        "id": 0,
        "name": "",
        "surname": "",
        "roomId": 0
    });
        
        fetchData().catch(console.error);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(editTherapist);
        console.log(JSON.stringify(editTherapist).replace("null","[]"));
         fetch('https://localhost:7126/api/Therapists', {
            method:  'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editTherapist).replace("null","[]"),
        }).then((response)=>{
        if(Math.floor(response.status/100)===2){
            alert('succesfull');
         }});
        setEditTherapist({
            "id": 0,
            "name": "",
            "surname": "",
            "roomId": 0
        });
        fetchData().catch(console.error);
    }
    const handleNameInputChange = (event) => {
        event.persist();
        setEditTherapist((values) => ({
            ...values,
            name: event.target.value,
        }));
    };
    const handleSurnameInputChange = (event) => {
        event.persist();
        setEditTherapist((values) => ({
            ...values,
            surname: event.target.value,
        }));
    };
    const handleRoomIdInputChange = (event) => {
        event.persist();
        setEditTherapist((values) => ({
            ...values,
            roomId: event.target.value,
        }));
    };
   
    async function fetchData()
    {
        const response = await fetch('https://localhost:7126/api/Therapists');
        const body = await response.json();
        let updatedTherapists = body.filter(i => i !== null);
        setTherapists(updatedTherapists);
    }

      
      return (
          <div className="App">
            <header className="App-header">
                <div >
                    {editTherapist.id===0?<h3>New therapist</h3>:<h3>Editing therapist #{editTherapist.id}</h3>}
                    <Container>
                        <form onSubmit={handleSubmit} >
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="model">Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="name" id="name" value={editTherapist.name || ''}
                                    autoComplete="name" onChange={handleNameInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="number">Surname</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="surname" id="surname" value={editTherapist.surname || ''}
                                     autoComplete="surname" onChange={handleSurnameInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="price">roomId</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" name="roomId" id="roomId" value={editTherapist.roomId || '' } 
                                    onChange={handleRoomIdInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                            {editTherapist.id!==0?<div><Button variant="warning" type="submit">Edit</Button>{' '}
                            <Button variant="primary" onClick={handleSave} type="submit">Save as new</Button>{' '}</div>:
                            <div> <Button color="primary" onClick={handleSave} type="submit">Save</Button>{' '}</div>}                            </div>
                        </form>
                    </Container>
                </div>
              <h3>Therapists</h3>
              <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Room id</th>
                    </tr>
                </thead>
                <tbody>
                    {therapists.map(therapist =>
                        <tr key={therapist.id}>
                            <td>{therapist.id} </td>
                            <td>{therapist.name} </td>
                            <td>{therapist.surname} </td>
                            <td>{therapist.roomId} </td>
                            <td>
                                <Button size="sm" variant="warning" onClick={() => {
                                    setEditTherapist(therapist);
                                    }}>Edit</Button>
                            </td>
                            <td>
                                <ButtonGroup>
                                    <Button size="sm" variant="danger" onClick={() => remove(therapist.id)}>Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )}
                </tbody>
              </Table>
            </header>
          </div>
      );
    
  }
