import React, { useMemo, useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import { Container, Content, Filters } from './styles';
import { isTemplateMiddle, reduceEachTrailingCommentRange } from 'typescript';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  type: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth()));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

  const { type } = match.params;

  // Quando mudar o valor de type ele atualiza a tela 
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

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
  }, [type])

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

  useEffect(() => {
    // Retorna a Data filtrada pelo ano e pelo mes usando filter 
    const filterdDate = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth());
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    const formattedData = filterdDate.map(item => {

      return {
        id: String(new Date().getTime()) + item.amount,
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        type: item.type,
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      }
    })

    setData(formattedData);

  }, [listData, monthSelected, yearSelected]);

  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor} >
        <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />
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
        {
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dataFormatted}
              amount={item.amountFormatted}
            />
          ))
        }
      </Content>
    </Container>
  )
}

export default List;