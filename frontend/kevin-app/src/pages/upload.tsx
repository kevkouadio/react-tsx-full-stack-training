import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as XLSX from "xlsx";
import { AppService } from '../service/backenApi';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  }

  const readFile = async () => {
    const reader = new FileReader();
    reader.onload = async (evt) => {
      if (evt.target) {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 } as any);
  
        /* Update state */
        //console.log("Data>>>" + data); // shows that excel data is read
        console.log(convertToJson(data)); // shows data in json format
        const jsonData = convertToJson(data)
        // send data to backend to save it
        try {
          const response = await AppService.multiAddUser(jsonData);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (file) {
      reader.readAsBinaryString(file);
    }
  }
  

  const convertToJson = (csv: string) => {
    const lines = csv.split("\n");
  
    const result: { [key: string]: string }[] = [];
  
    const headers = lines[0].split(",");
  
    for (let i = 1; i < lines.length; i++) {
      const obj: { [key: string]: string } = {};
      const currentline = lines[i].split(",");
  
      for (let j = 0; j < headers.length; j++) {
        if (currentline[j]) {
          obj[headers[j]] = currentline[j];
        }
      }
  
      // skip empty rows
      if (Object.keys(obj).length > 0) {
        result.push(obj);
      }
    }
  
    //return result; //JavaScript object
    return result; 
  }    

  return (
    <form>
      <TextField 
      variant="outlined"
      inputProps={{ accept: '.xls, .xlsx, .csv' }} 
      type="file" 
      onChange={handleFileChange} />
      <br/>
      <br/>
      <Button variant="contained" color="primary" onClick={readFile}>
        Upload
      </Button>
    </form>
  );
}

export default Upload;
