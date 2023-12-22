import React, { useState } from "react";
import './D156.css';
const D156 = () => {

  // petioner div and respondent div and complaint area div
 

  // 1. petioner starts
  const districts = ["District 1", "District 2"]; // Add your district options
  const thanasByDistrict = {
    "District 1": ["Thana 1A", "Thana 1B"],
    "District 2": ["Thana 2A", "Thana 2B", "Thana 2C"],
    // Add more entries for other districts and their respective thanas
  };

  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [petitioners, setPetitioners] = useState([]);

  const handleDistrictChange = (selectedDistrict) => {
    setDistrict(selectedDistrict);
    // Reset the selected thana when the district changes
    setThana("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPetitioner = { name, fatherName, district, thana, address, age };
    setPetitioners([...petitioners, newPetitioner]);

    // Clear the form fields after submission
    setName("");
    setFatherName("");
    setDistrict("");
    setThana("");
    setAddress("");
    setAge("");
  };

  const [rName, rSetName] = useState("");
  const [rFatherName, rSetFatherName] = useState("");
  const [rDistrict, rSetDistrict] = useState("");
  const [rThana, rSetThana] = useState("");
  const [rAddress, rSetAddress] = useState("");
  const [rAge, rSetAge] = useState("");
  const [respondents, setRespondents] = useState([]);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const newRespondent = {
      rName,
      rFatherName,
      rDistrict,
      rThana,
      rAddress,
      rAge,
    };
    setRespondents([...respondents, newRespondent]);

    //clear all the fields after submission
    rSetName("");
    rSetFatherName("");
    rSetDistrict("");
    rSetThana("");
    rSetAddress("");
    rSetAge("");
  };

  const handleRemovePetitioner = (index) => {
    const updatedPetitioners = [...petitioners];
    updatedPetitioners.splice(index, 1);
    setPetitioners(updatedPetitioners);
  };

  const handleRemoveRespondent = (index) => {
    const updatedRespondents = [...respondents];
    updatedRespondents.splice(index, 1);
    setRespondents(updatedRespondents);
  };

  const handleSendData = async () => {
    // Send the entire array of petitioners to the server
    // default hiding of respondent
    let petitionerDiv = document.getElementById("petitioner");
    petitionerDiv.style.display = "none";

      let respondentDiv = document.getElementById("respondent");
    respondentDiv.style.display ="initial";

    try {
      const response = await fetch("https://abbuja.000webhostapp.com/JC.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petitioners),
      });

      // Handle the response from the server if needed
      const responseData = await response.json();
      console.log("Server Response:", responseData);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  const goBackToPetitoner = () => {
    let respondentDiv = document.getElementById("respondent");
    respondentDiv.style.display = "none" ;
  
    let complaintAreaDiv = document.getElementById("complaintArea");
    complaintAreaDiv.style.display = "none";
  
    let petitionerDiv = document.getElementById("petitioner");
    petitionerDiv.style.display = "block";
  };
  
  const goToComplaintArea = () => {
    let respondentDiv = document.getElementById("respondent");
    respondentDiv.style.display = "none";
  
    let complaintAreaDiv = document.getElementById("complaintArea");
    complaintAreaDiv.style.display ="block";
  
    let petitionerDiv = document.getElementById("petitioner");
    petitionerDiv.style.display = "none";
  };
  
 const goBackToRespondent= () => {
  let respondentDiv = document.getElementById("respondent");
  respondentDiv.style.display = "block" ;

  let complaintAreaDiv = document.getElementById("complaintArea");
  complaintAreaDiv.style.display = "none";

  let petitionerDiv = document.getElementById("petitioner");
  petitionerDiv.style.display = "none";
};

const downloadPdf=()=>{
  
}

  return (
    <>
      <div id="petitioner">
        <form onSubmit={handleSubmit}>
          {/* form for petitoners starts */}
          <label>
            Name (as in Aadhar card):
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />

          <label>
            Father's Name:
            <input
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </label>
          <br />

          <label>
            District:
            <select
              value={district}
              onChange={(e) => handleDistrictChange(e.target.value)}
            >
              {districts.map((districtOption) => (
                <option key={districtOption} value={districtOption}>
                  {districtOption}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Thana:
            <select value={thana} onChange={(e) => setThana(e.target.value)}>
              {thanasByDistrict[district]?.map((thanaOption) => (
                <option key={thanaOption} value={thanaOption}>
                  {thanaOption}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <br />

          <label>
            Age:
            <select value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="18">18</option>
              <option value="19">19</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <br />
          {/* form for petitoner ends */}
          <button type="submit">Submit</button>
        </form>
        {/* Display submitted petitioners */}
        {petitioners.length > 0 && (
          <div>
            <h2>Submitted Petitioners:</h2>
            <ul>
              {petitioners.map((petitioner, index) => (
                <li key={index}>
                  <strong>{`Petitioner ${index + 1}:`}</strong>
                  <ul>
                    <li>Name: {petitioner.name}</li>
                    <li>Father's Name: {petitioner.fatherName}</li>
                    <li>District: {petitioner.district}</li>
                    <li>Thana: {petitioner.thana}</li>
                    <li>Address: {petitioner.address}</li>
                    <li>Age: {petitioner.age}</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleRemovePetitioner(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Button to send data to the server */}
        {petitioners.length > 0 && (
          <div>
            <button type="button" onClick={handleSendData}>
              Save And Proceed to Respondents
            </button>
          </div>
        )}
      </div>
      {/* respondent form starts */}





      <div id="respondent">
        {/* form for respondent starts  */}
        <form onSubmit={handleSubmit2}>
          {/* Your form fields for respondents */}
          <label>
            Name:
            <input
              type="text"
              value={rName}
              onChange={(e) => rSetName(e.target.value)}
            />
          </label>
          <br />

          <label>
            Father's Name:
            <input
              type="text"
              value={rFatherName}
              onChange={(e) => rSetFatherName(e.target.value)}
            />
          </label>
          <br />

          <label>
            District:
            {/* Add your district options and set the value based on rDistrict */}
            <select
              value={rDistrict}
              onChange={(e) => rSetDistrict(e.target.value)}
            >
              {/* Add your district options here */}
            </select>
          </label>
          <br />

          <label>
            Thana:
            {/* Add your thana options based on the selected district and set the value based on rThana */}
            <select value={rThana} onChange={(e) => rSetThana(e.target.value)}>
              {/* Add your thana options here */}
            </select>
          </label>
          <br />

          <label>
            Address:
            <input
              type="text"
              value={rAddress}
              onChange={(e) => rSetAddress(e.target.value)}
            />
          </label>
          <br />

          <label>
            Age:
            {/* Add your age options and set the value based on rAge */}
            <select value={rAge} onChange={(e) => rSetAge(e.target.value)}>
              {/* Add your age options here */}
            </select>
          </label>
          <br />

          <button type="submit">Submit Respondent</button>
        </form>
        {/* form for respondents ends */}
        <h1> Respondent Data is.</h1>
        {/* <button type="button" onClick={goBackToPetitoner}>
          Go Back TO Petitioner
        </button>

        <button type="button" onClick={goToComplaintArea}>
          Go Back TO Complaint Area
        </button> */}
        
  {/* respondent display area starts */}
  {respondents.length > 0 && (
        <div>
          <h2>Submitted Respondents:</h2>
          <ul>
            {respondents.map((respondent, index) => (
              <li key={index}>
                <strong>{`Respondent ${index + 1}:`}</strong>
                <ul>
                  <li>Name: {respondent.rName}</li>
                  <li>Father's Name: {respondent.rFatherName}</li>
                  <li>District: {respondent.rDistrict}</li>
                  <li>Thana: {respondent.rThana}</li>
                  <li>Address: {respondent.rAddress}</li>
                  <li>Age: {respondent.rAge}</li>
                </ul>
                <button
                  type="button"
                  onClick={() => handleRemoveRespondent(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* respondent displaly area ends */}
      <button type="button" onClick={goBackToPetitoner}>
    Go Back TO Petitioner from respondent
  </button>

  <button type="button" onClick={goToComplaintArea}>
    Go to Complaint Area
  </button>
      </div>
      {/* respondent form ends */}






      {/* complaint area starts  */}
      <div id="complaintArea" >
      <h1> Complaint area.</h1>
  <button type="button" onClick={goBackToRespondent}>
    Go Back TO Respondents
  </button>

  <button type="button" onClick={downloadPdf}>
    Download PDF
  </button>
      </div>
      {/* complaint area ends */}
    </>
  );
};

export default D156;
