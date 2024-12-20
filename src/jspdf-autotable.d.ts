// jspdf-autotable.d.ts
import * as jsPDF from 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: any; // Esta declaração permite que o TypeScript reconheça o método autoTable
  }
}
