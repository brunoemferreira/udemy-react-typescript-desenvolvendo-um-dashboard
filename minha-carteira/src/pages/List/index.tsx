import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const List: React.FC = () => {
  const frutas = [
    { value: 'Banana', label: 'Banana' },
    { value: 'Abacaxi', label: 'Abacaxi' },
    { value: 'Uva', label: 'Uva' }
  ];

  return (
    <Container>
      <ContentHeader title="Lista" lineColor="red" >
        <SelectInput options={frutas} />
      </ContentHeader>
    </Container>
  )
}

export default List;