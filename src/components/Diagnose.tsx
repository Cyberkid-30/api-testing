import { FormEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../context";
import axios from "axios";
import { API_URL } from "../api";
import "../index.css";

export interface FormData {
  soil_type: string;
  soil_moisture: number;
  temperature: number;
  seedlings_exposed_to_sunlight: string;
  growth_stage: string;
  disease: string;
}

interface fetchResponse {
  actions: String[];
}

const Diagnose = () => {
  const [diagnosis, setDiagnosis] = useState<String[]>([]);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [diseases, setDiseases] = useState<String[]>([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/diseases`)
      .then((res) => res.data)
      .then((data) => {
        setDiseases(data.diseases);
      });
  }, []);

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post<fetchResponse>(
        "https://cocoa-expert-system.onrender.com/diagnose",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDiagnosis(response.data.actions);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container">
      <h2>Cocoa Disease Diagnosis</h2>
      <form onSubmit={handleSubmit}>
        {/* Soil Type Dropdown */}
        <div>
          <label>Soil Type:</label>
          <select
            name="soil_type"
            value={formData.soil_type}
            onChange={handleChange}
            required
          >
            <option value="">Select soil type</option>
            <option value="sterilized">Sterilized</option>
            <option value="not sterilized">Not Sterilized</option>
          </select>
        </div>

        {/* Soil Moisture */}
        <div>
          <label>Soil Moisture (%):</label>
          <input
            type="Number"
            name="soil_moisture"
            value={formData.soil_moisture}
            onChange={(e) =>
              setFormData({
                ...formData,
                soil_moisture: parseInt(e.target.value),
              })
            }
            required
          />
        </div>

        {/* Temperature */}
        <div>
          <label>Temperature (°C):</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={(e) =>
              setFormData({
                ...formData,
                temperature: parseInt(e.target.value),
              })
            }
            required
          />
        </div>

        {/* Seedlings Exposed to Sunlight Dropdown */}
        <div>
          <label>Seedlings Exposed to Sunlight:</label>
          <select
            name="seedlings_exposed_to_sunlight"
            value={formData.seedlings_exposed_to_sunlight}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Growth Stage Dropdown */}
        <div>
          <label>Growth Stage:</label>
          <select
            name="growth_stage"
            value={formData.growth_stage}
            onChange={handleChange}
            required
          >
            <option value="">Select growth stage</option>
            <option value="germination">Germination</option>
            <option value="seedling">Seedling</option>
            <option value="nursery">Nursery</option>
          </select>
        </div>

        {/* Disease Dropdown */}
        <div>
          <label>Disease:</label>
          <select
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            required
          >
            <option value="">Select disease</option>
            {diseases.map((disease, index) => (
              <option key={index} value={disease.toString()}>
                {disease}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Diagnose</button>
      </form>

      {diagnosis.length > 0 && (
        <div>
          <h3>Suggested Actions:</h3>
          <ul>
            {diagnosis.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      )}

      {/* {diseases.length > 0 && (
        <div>
          <h3>Diseases</h3>
          <ul>
            {diseases.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Diagnose;
