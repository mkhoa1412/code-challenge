import { Typography } from '@mui/material';

import { ContentLayout } from '@/components/Layout';

export function NotFound() {
  return (
    <ContentLayout title="Not found">
      <Typography>Something went wrong !</Typography>
    </ContentLayout>
  );
}
