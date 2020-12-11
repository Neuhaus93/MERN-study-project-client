export const getCategoriesArray = (categoryFilter: {
  tools: boolean;
  equipment: boolean;
  software: boolean;
}) => {
  const categories = [] as string[];

  Object.values(categoryFilter).forEach((e, index) => {
    if (e) {
      switch (index) {
        case 0:
          categories.push('tools');
          return;

        case 1:
          categories.push('equipment');
          return;

        case 2:
          categories.push('software');
          return;

        default:
          return;
      }
    }
  });

  return categories;
};
