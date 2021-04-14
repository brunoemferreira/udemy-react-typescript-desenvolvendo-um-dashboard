import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const options = [
    { value: 'Bruno', label: 'Bruno' },
    { value: 'Emanuele', label: 'Emanuele' },
    { value: 'Victor', label: 'Victor' }
  ]

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#E44c44" >
        <SelectInput options={options} />
      </ContentHeader>
    </Container>
  )
}

export default Dashboard;