import React, { useState, useEffect, Component } from "react";
import { Button, ButtonGroup, Container, Table, Form, FormGroup, InputGroup, FormLabel } from 'react-bootstrap';
export default function Calendar() {
    const [records,setRecords] = useState([]);
    const [therapists, setTherapists] = useState([])
    const [currentTherapistId, setCurrentTherapistId]=useState(1);
    const [editRecord,setEditRecord] = useState({    
        "id": 0,
        "therapistId": 0,
        "patientName": "",
        "patientSurname": "",
        "recordTime": "",
        "frequency": "",
        "description": ""});
        useEffect(() => {

        }, [currentTherapistId]);
        useEffect(() => {
              
        }, [records]);
    const  remove = async (id) =>{
        console.log(id);
        await fetch(`https://localhost:7126/api/Records/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedRecords = records.filter(i => i.id !== id);
            setRecords(updatedRecords);
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }});
    }
    const  HandleSearch = async(event) =>{
        event.preventDefault();
        const response =  await fetch('https://localhost:7126/api/Records/search/'+event.target.searchParam.value);
        console.log(event.target.searchParam.value);

        const body = await response.json();
        console.log(body);
        setRecords([...body]);
    }
    const handleTherapistChoose = (event) =>{
        event.preventDefault();
        setCurrentTherapistId(event.currentTarget.therapistId.value);
        console.log("event.currentTarget.therapistId.value = "+event.currentTarget.therapistId.key);
        console.log("currentTherapistId = "+currentTherapistId);
    }
    const handleSave = (event) => {
        event.preventDefault();
        const recordToSave = editRecord;
        recordToSave.id=0;
        setEditRecord(recordToSave);
        console.log(editRecord);
        console.log(JSON.stringify(editRecord).replace("null","[]"));
         fetch('https://localhost:7126/api/Records', {
            method:  'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editRecord).replace("null","[]"),
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             }});
        setEditRecord({
        "id": 0,
        "therapistId": 0,
        "patientName": "",
        "patientSurname": "",
        "recordTime": "",
        "frequency": "",
        "description": ""});
        fetchData().catch(console.error);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(editRecord);
        console.log(JSON.stringify(editRecord).replace("null","[]"));
         fetch('https://localhost:7126/api/Records/' + currentTherapistId, {
            method:  'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editRecord).replace("null","[]"),
        }).then((response)=>{
            if(Math.floor(response.status/100)===2){
                alert('succesfull');
             } else{
                alert('it is not your patient');
             }});
        setEditRecord({
            "id": 0,
            "therapistId": 0,
            "patientName": "",
            "patientSurname": "",
            "recordTime": "",
            "frequency": "",
            "description": ""});
        fetchData().catch(console.error);
    }
    const handleTherapistsIdInputChange = (event) => {
        event.persist();
        setEditRecord((values) => ({
            ...values,
            therapistId: event.target.value,
        }));
    };
    const handlePatientNameInputChange = (event) => {
        event.persist();
        setEditRecord((values) => ({
            ...values,
            patientName: event.target.value,
        }));
    };
    const handlePatientSurnameInputChange = (event) => {
        event.persist();
        setEditRecord((values) => ({
            ...values,
            patientSurname: event.target.value,
        }));
    };
    const handleRecordTimeInputChange = (event) => {
        event.persist();
        setEditRecord((values) => ({
            ...values,
            recordTime: event.target.value,
        }));
    };
    const handleFrequencyInputChange = (event) => {
        event.persist();
        setEditRecord((values) => ({
            ...values,
            frequency: event.target.value,
        }));
    };
    const handleDescriptionInputChange = (event) => {
        event.persist();
        setEditRecord((values) => ({
            ...values,
            description: event.target.value,
        }));
    };
    const fetchData = async()=>
    {
        const response = await fetch('https://localhost:7126/api/Records');
        const body = await response.json();
        setRecords([...body]);
        const response2 = await fetch('https://localhost:7126/api/Therapists');
        const body2 = await response2.json();
        setTherapists([...body2]);
        console.log("data fetched");
    }
     useEffect(()=>{

        fetchData().catch(console.error);
    },[])
      
      return (
          <div className="App">
            <header className="App-header">
                <div >
                    <div>
                        {currentTherapistId!==0?<h3>Calendar for therapist #{currentTherapistId}</h3>:<></> }
                        <table>
                            <tr>
                                <th><h5>Choose your id</h5></th>
                                <th>
                                    <select name="therapistId" form="therapistId-form">{
                                        therapists.map( (t) => <option key={t.id}>{t.id}</option> )
                                    }
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                     <form onSubmit={handleTherapistChoose} id ="therapistId-form">
                                        <Button color="primary" type="submit">Submit</Button>{' '}
                                    </form>
                                </th>
                            </tr>
                        </table>
                        
                    </div>
                    {editRecord.id===0?<h3>New record</h3>:<h3>Editing record #{editRecord.id}</h3>}
                    <Container>
                        <form onSubmit={handleSubmit} >
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="therapistId">Therapists Id</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" name="therapistId" id="model" value={editRecord.therapistId || '0'}
                                    autoComplete="0" onChange={handleTherapistsIdInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="patientName">Patient Name</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="patientName" id="patientName" value={editRecord.patientName || ''}
                                     autoComplete="Name" onChange={handlePatientNameInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="patientSurname">Patient Surname</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="patientSurname" id="patientSurname" value={editRecord.patientSurname || ''}
                                     autoComplete="Surname" onChange={handlePatientSurnameInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="recordTime">Time</label>
                                <div class="col-sm-10">
                                <input type="datetime-local" class="form-control" name="recordTime" id="recordTime"  checked={editRecord.recordTime||""}
                                    onChange={handleRecordTimeInputChange}/>
                                    </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="recordTime">Frequency</label>
                                <div class="col-sm-10">
                                <input type="number" class="form-control" name="frequency" id="frequency"  checked={editRecord.frequency||""}
                                    onChange={handleFrequencyInputChange}/>
                                    </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-2 col-form-label" for="description">Description</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="description" id="description" value={editRecord.description || ''}
                                     autoComplete="description" onChange={handleDescriptionInputChange}/>
                                </div>
                            </div>
                            <div class="form-group row">
                            {editRecord.id!==0?<div><Button variant="warning" type="submit">Edit</Button>{' '}
                            <Button variant="primary" onClick={handleSave} type="submit">Save as new</Button>{' '}</div>:
                            <div> <Button color="primary" onClick={handleSave} type="submit">Save</Button>{' '}</div>}
                            </div>
                        </form>
                    </Container>
                </div>
                <h5>Search records by patient's surname </h5>
                <form onSubmit={HandleSearch}>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label" for="searchParam">Surname</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="searchParam" id="searchParam" />
                    </div>
                    <div class="col-sm-10">
                        <Button color="confirm" type="submit">Search</Button>
                        <Button class="btn btn-secondary" onClick={fetchData}>Search All</Button>
                    </div>
                   
                </div>
                </form>
              <h3>Records</h3>
              <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Therapists id</th>
                    <th>Patient name</th>
                    <th>Patient surname</th>
                    <th>Date and Time</th>
                    <th>Frequency</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {records
                    .map(record =>
                        <tr key={record.id}>
                            <td>{record.id} </td>
                            <td>{record.therapistId} </td>
                            <td>{record.patientName} </td>
                            <td>{record.patientSurname} </td>
                            <td>{record.recordTime} </td>
                            <td>{record.frequency} </td>
                            <td>{record.description} </td>
                            <td>
                                {currentTherapistId==record.therapistId ? <Button size="sm" variant="warning" onClick={() => {
                                    setEditRecord(record);
                                    console.log("record");
                                    console.log(record);
                                    console.log("editRecord");
                                    console.log(editRecord);
                                    }}>Edit</Button> :"no permission"
                                }
                            </td>
                            <td>
                                {currentTherapistId==record.therapistId ?   <Button size="sm" variant="danger" onClick={() => remove(record.id)}>Delete</Button>
                                :"no permission"
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
              </Table>
            </header>
          </div>
      );
}
