import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type { ResumeData } from '@/types';

// Registrando a fonte com suas variações para evitar avisos de fallback
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v1/1.ttf' }, // Regular
    {
      src: 'https://fonts.gstatic.com/s/helveticaneue/v1/1.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.gstatic.com/s/helveticaneue/v1/1.ttf',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11, // Reduzido levemente para caber mais conteúdo
    lineHeight: 1.4,
    color: '#111827', // Preto suave (gray-900)
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#374151',
    paddingBottom: 10,
  },
  name: {
    fontSize: 22, // Tamanho equilibrado para não ocupar muito espaço
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1, // Melhora a legibilidade do título
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Permite quebra se tiver muitos contatos
    fontSize: 9,
    color: '#4B5563', // gray-600
  },
  contactItem: {
    marginRight: 8, // Substituto seguro para o 'gap'
  },
  separator: {
    marginRight: 8,
    color: '#9CA3AF',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Linha cinza clara
    marginBottom: 8,
    paddingBottom: 2,
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  experienceBlock: {
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  role: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  company: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#374151',
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: '#6B7280', // gray-500
    textAlign: 'right',
  },
  description: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'justify',
    color: '#374151',
  },
  skills: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
  },
});

interface Props {
  data: ResumeData;
}

export const ResumeDocument = ({ data }: Props) => {
  // Helper para renderizar itens de contato com separador
  const ContactItem = ({
    text,
    last = false,
  }: {
    text: string;
    last?: boolean;
  }) => (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.contactItem}>{text}</Text>
      {!last && <Text style={styles.separator}>|</Text>}
    </View>
  );

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* CABEÇALHO */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{data.fullName}</Text>

          <View style={styles.contactRow}>
            {data.email && (
              <ContactItem
                text={data.email}
                last={!data.phone && !data.linkedin}
              />
            )}

            {data.phone && (
              <ContactItem text={data.phone} last={!data.linkedin} />
            )}

            {data.linkedin && (
              <ContactItem
                text={data.linkedin
                  .replace(/^https?:\/\/(www\.)?/, '')
                  .replace(/\/$/, '')}
                last={true}
              />
            )}
          </View>
        </View>

        {/* RESUMO */}
        {data.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Resumo Profissional</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* EXPERIÊNCIA */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            {data.experience.map(exp => (
              <View key={exp.id} style={styles.experienceBlock} wrap={false}>
                <View style={styles.headerRow}>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCAÇÃO */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
            {data.education.map(edu => (
              <View key={edu.id} style={styles.experienceBlock} wrap={false}>
                <View style={styles.headerRow}>
                  <Text style={styles.role}>{edu.school}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} – {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.company}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {data.skills && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Habilidades & Competências</Text>
            <Text style={styles.skills}>{data.skills}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
