import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Estilos para el PDF con los colores corporativos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#EA580C', // Naranja corporativo
    paddingBottom: 10,
  },
  logoPlaceholder: {
    width: 120,
    height: 40,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF', // Azul corporativo
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 4,
  },
  text: {
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.5,
    marginBottom: 5,
  },
  highlight: {
    backgroundColor: '#F1F5F9',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  chartBar: {
    alignItems: 'center',
    width: '22%',
  },
  barLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  barValue: {
    width: '100%',
    backgroundColor: '#E2E8F0',
    height: 100,
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#999999',
    fontSize: 9,
    borderTop: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
  }
});

interface DISCPdfProps {
  results: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
  analysis: string;
}

export const DISCPdfDocument = ({ results, analysis }: DISCPdfProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>HACKE'S JOBS</Text>
        </View>
        <Text style={{ fontSize: 10, color: '#666666' }}>Informe de Evaluación DISC</Text>
      </View>

      <Text style={styles.title}>Resultado de Evaluación DISC</Text>
      <Text style={styles.subtitle}>Perfil de Personalidad y Estilo de Trabajo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumen Gráfico</Text>
        <View style={styles.chartContainer}>
          {Object.entries(results).map(([type, value]) => (
            <View key={type} style={styles.chartBar}>
              <Text style={styles.barLabel}>{type}</Text>
              <View style={styles.barValue}>
                <View 
                  style={[
                    styles.barFill, 
                    { 
                      height: `${value}%`, 
                      backgroundColor: 
                        type === 'D' ? '#EF4444' : 
                        type === 'I' ? '#F59E0B' : 
                        type === 'S' ? '#10B981' : '#3B82F6' 
                    }
                  ]} 
                />
              </View>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{value}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Análisis del Perfil</Text>
        <View style={styles.highlight}>
          <Text style={styles.text}>{analysis}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entendiendo tu Perfil</Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>D - Dominancia: </Text>
          Mide cómo respondes a los problemas y desafíos. Puntuaciones altas indican un enfoque directo, competitivo y orientado a resultados.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>I - Influencia: </Text>
          Mide cómo influyes en los demás. Puntuaciones altas sugieren una persona entusiasta, comunicativa, optimista y persuasiva.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>S - Estabilidad: </Text>
          Mide tu respuesta al ritmo del entorno. Puntuaciones altas indican lealtad, paciencia, persistencia y un enfoque en el apoyo mutuo.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>C - Cumplimiento: </Text>
          Mide cómo respondes a las reglas y procedimientos. Puntuaciones altas sugieren precisión, análisis, orden y alta calidad técnica.
        </Text>
      </View>

      <Text style={styles.footer}>
        Hacke's Jobs - Reclutamiento Inteligente con IA | www.hackesjobs.com.mx
      </Text>
    </Page>
  </Document>
);
