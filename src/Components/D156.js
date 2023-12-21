import React, { useState } from 'react';

const D156 = () => {
  const districts = ['District 1', 'District 2']; // Add your district options
  const thanasByDistrict = {
    'District 1': ['Thana 1A', 'Thana 1B'],
    'District 2': ['Thana 2A', 'Thana 2B', 'Thana 2C'],
    // Add more entries for other districts and their respective thanas
  };

  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [district, setDistrict] = useState('');
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [petitioners, setPetitioners] = useState([]);

  const handleDistrictChange = (selectedDistrict) => {
    setDistrict(selectedDistrict);
    // Reset the selected thana when the district changes
    setThana('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPetitioner = { name, fatherName, district, thana, address, age };
    setPetitioners([...petitioners, newPetitioner]);

    // Clear the form fields after submission
    setName('');
    setFatherName('');
    setDistrict('');
    setThana('');
    setAddress('');
    setAge('');
  };


  

  const handleRemovePetitioner = (index) => {
    const updatedPetitioners = [...petitioners];
    updatedPetitioners.splice(index, 1);
    setPetitioners(updatedPetitioners);
  };



  const handleSendData = async () => {
    // Send the entire array of petitioners to the server
    try {
      const response = await fetch('https://abbuja.000webhostapp.com/JC.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petitioners),
      });

      // Handle the response from the server if needed
      const responseData = await response.json();
      console.log('Server Response:', responseData);
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name (as in Aadhar card):
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />

        <label>
          Father's Name:
          <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
        </label>
        <br />

        <label>
          District:
          <select value={district} onChange={(e) => handleDistrictChange(e.target.value)}>
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
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                <button type="button" onClick={() => handleRemovePetitioner(index)}>
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
            Send Data to Server
          </button>
        </div>
      )}
    </div>
  );
};

export default D156;
