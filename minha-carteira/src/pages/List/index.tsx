import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';

import { Container, Content } from './styles';

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
      <Content>
        <HistoryFinanceCard
          tagColor="#E44c4E"
          title="Conta de Luz"
          subtitle="27/07/2021"
          amount="R$ 130,00"
        />

      </Content>
    </Container>
  )
}

export default List;