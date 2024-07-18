import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const BankSelector = ({ onBankSelect }) => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    fetch("/banks.json")
      .then((response) => response.json())
      .then((data) => setBanks(data))
      .catch((error) => console.error("Error fetching banks:", error));
  }, []);

  const handleBankSelect = (event, value) => {
    setSelectedBank(value);
    onBankSelect(value ? value.en_name : "");
  };

  return (
    <div className="m-0 p-0">
      <Autocomplete
        className="mt-4 mx-0 p-0"
        options={banks}
        getOptionLabel={(option) => option.shortName}
        renderInput={(params) => (
          <TextField {...params} label="Select Bank" variant="outlined" />
        )}
        onChange={handleBankSelect}
        value={selectedBank}
        isOptionEqualToValue={(option, value) =>
          option.en_name === value.en_name
        }
      />
      {selectedBank && <div>Selected Bank: {selectedBank.en_name}</div>}
    </div>
  );
};

export default BankSelector;
