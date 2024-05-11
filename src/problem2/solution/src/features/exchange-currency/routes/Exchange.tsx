import { ContentLayout } from '@/components/Layout';

import { ExchangeForm } from '../components/ExchangeForm';

export function Exchange() {
  return (
    <ContentLayout title="Swap">
      <ExchangeForm />
    </ContentLayout>
  );
}

Exchange.propTypes = {};
