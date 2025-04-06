import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "sonner";

/**
 * @param num
 * @returns the formarted amount in money type as naira.
 */
export function currencyFormat(num: number) {
  if (!num) return "₦0.00";
  const numericValue = Number(num);
  if (isNaN(numericValue)) {
    return "₦" + 0;
  } else {
    return (
      "₦" + numericValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }
}

export const stringifyFilter = (filter: any, allowNull?: boolean): string => {
  let filterString = "";
  if (!filter || typeof filter !== "object") {
    return "";
  }
  for (const item in filter) {
    if (
      item &&
      filter[item] !== undefined &&
      filter[item] !== "" &&
      (filter[item] !== null || allowNull)
    ) {
      filterString = filterString ? `${filterString}&` : filterString;
      filterString += `${item}=${filter[item]}`;
    }
  }
  filterString = filterString ? `?${filterString}` : filterString;
  return filterString;
};

export const parseTimerString = (timerString: any) => {
  // Extract numbers using regex and return as an array
  if (!timerString) return [];
  const match = timerString.match(/(\d+)/g);
  console.log(match, "the matchhh");
  return match || [];
};

export const convertArrayOfObjectsToWorksheet = async (
  arrayOfObjects: any[],
  sheetName: string
) => {
  const worksheet = XLSX.utils.json_to_sheet(arrayOfObjects);
  if (worksheet) {
    exportToExcel(worksheet, sheetName.concat(".xlsx"));
    // exportToPDF(arrayOfObjects, sheetName.concat(".pdf"), sheetName);
    toast.success("Report Downloaded Successfully");
  } else {
    toast.error("Failed to export data");
  }
};

export const exportToPDF = (
  arrayOfObjects: any[],
  fileName: string,
  title: string
) => {
  const doc = new jsPDF();

  // Set the font size to small
  doc.setFontSize(10);

  // Add a title to the PDF
  doc.text(title, 14, 20);

  // Map the data into a format suitable for autoTable
  const tableColumnHeaders = Object.keys(arrayOfObjects[0] || {});
  const tableRows = arrayOfObjects.map((item) => Object.values(item));

  // Add a table to the PDF
  (doc as any).autoTable({
    startY: 30,
    head: [tableColumnHeaders],
    body: tableRows,
  });

  // Save the PDF
  doc.save(fileName);
};

const exportToExcel = (worksheet: any, filename: any) => {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
};
