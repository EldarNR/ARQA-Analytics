export const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new':
      return 'secondary';

    case 'processing':
      return 'default';

    case 'shipped':
      return 'default';

    default:
      return 'outline';
  }
};
