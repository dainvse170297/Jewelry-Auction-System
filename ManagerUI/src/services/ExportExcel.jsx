import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcel = (data) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "ExportedData.xlsx");
  };

  return (
    <div>
      <h1>Export Data to Excel</h1>
      <button onClick={exportToExcel}>Export</button>
    </div>
  );
};

export default ExportExcel;
