"use client";

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DISCPdfDocument } from './DISCPdfDocument';
import { FileDown } from 'lucide-react';
import { Button } from './Button';

interface PDFDownloadButtonProps {
  results: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
  analysis: string;
}

const PDFDownloadButton = ({ results, analysis }: PDFDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<DISCPdfDocument results={results} analysis={analysis} />}
      fileName="Reporte_DISC_HackesJobs.pdf"
    >
      {({ loading }) => (
        <Button 
          variant="dark" 
          size="lg" 
          disabled={loading}
          className="rounded-2xl px-10 shadow-premium"
        >
          <FileDown className="mr-3 w-6 h-6 text-brand-orange" />
          {loading ? 'Preparando PDF...' : 'Descargar Reporte PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default PDFDownloadButton;
