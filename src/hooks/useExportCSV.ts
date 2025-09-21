'use client';

export const useExportCSV = <T extends Record<string, any>>() => {
  const exportToCSV = (data: T[], fileName = 'export.csv') => {
    if (!data.length) {
      throw new Error('No data to export');
    }

    try {
      const headers = Object.keys(data[0]).join(',');

      const rows = data.map((row) =>
        Object.values(row)
          .map((value) => (typeof value === 'string' && value.includes(',') ? `"${value}"` : value))
          .join(','),
      );

      const csvContent = [headers, ...rows].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('CSV export failed:', error);
      throw error;
    }
  };

  return { exportToCSV };
};
