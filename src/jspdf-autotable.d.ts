import "jspdf"; // Importa o tipo base do jsPDF

declare module "jspdf" {
  interface jsPDF {
    autoTable: (columns: string[], data: any[][], options?: any) => void; // Tipagem básica
  }
}