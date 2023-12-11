"use client";

type CSVSaveButtonProps = {
  csvContent: string;
};

const CSVSaveButton = ({ csvContent }: CSVSaveButtonProps) => {
  const downloadCSV = () => {
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "emails.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className="rounded-xl bg-dark-teal px-3.5 py-2 text-white"
      onClick={downloadCSV}
    >
      Export to .csv
    </button>
  );
};

export default CSVSaveButton;
