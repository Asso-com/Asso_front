export const validateDateWithinAcademicPeriods = (academicPeriods: any[]) => {
  return (value: string | undefined) => {
    if (!value || !academicPeriods || academicPeriods.length === 0) {
      return true;
    }

    const inputDate = new Date(value);
    const activePeriods = academicPeriods.filter((period: any) => period.active);
    
    if (activePeriods.length === 0) {
      return true;
    }

    return activePeriods.some((period: any) => {
      const periodStart = new Date(period.startDate);
      const periodEnd = new Date(period.endDate);
      return inputDate >= periodStart && inputDate <= periodEnd;
    });
  };
};