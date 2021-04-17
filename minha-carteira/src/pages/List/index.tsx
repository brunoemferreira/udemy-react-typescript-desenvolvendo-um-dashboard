import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import { Container, Content, Filters } from './styles';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';


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
  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

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

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    })
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      // includes verifica se o ano esta dentro da lista
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    });
    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      }
    })
  }, [listData]);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(item => item === frequency);


    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter(item => item === frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }

  }

  useEffect(() => {
    // Retorna a Data filtrada pelo ano e pelo mes usando filter 
    const filterdDate = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
    });

    const formattedData = filterdDate.map(item => {

      return {
        id: uuidv4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        type: item.type,
        frequency: item.frequency,
        dataFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      }
    })

    setData(formattedData);

  }, [listData, monthSelected, yearSelected, selectedFrequency]);

  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor} >
        <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>
      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent
          ${selectedFrequency.includes('recorrente') && 'tag-activated'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
          </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual
          ${selectedFrequency.includes('eventual') && 'tag-activated'}`}
          onClick={() => handleFrequencyClick('eventual')}
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