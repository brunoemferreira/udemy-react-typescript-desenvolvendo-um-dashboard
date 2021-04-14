import React, { useMemo } from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const { type } = match.params;

  const title = useMemo(() => {
    return type === 'entry-balance' ? {
      title: 'Entradas',
      lineColor: '#F79318'
    } :
      {
        title: 'Saídas',
        lineColor: '#E44C4E'
      };
  }, [type]);




  const months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' }
  ];

  const years = [
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 }

  ];

  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor} >
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ContentHeader>
      <Filters>
        <button
          type="button"
          className="tag-filter tag-filter-recurrent"
        >
          Recorrentes
          </button>
        <button
          type="button"
          className="tag-filter tag-filter-eventual"
        >
          Eventuais
          </button>
      </Filters>
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