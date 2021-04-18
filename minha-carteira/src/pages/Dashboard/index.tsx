import React, { useState, useMemo } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';

import listOfMonths from '../../utils/months';

import { Container, Content } from './styles';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import MessaBox from '../../components/MessageBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

const Dashboard: React.FC<IRouteParams> = ({ match }) => {
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

  const movimentType = match.params.type;

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

    [...expenses, ...gains].forEach(item => {
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
  }, []);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error('Invalid month value.')
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setMonthSelected(parseYear);
    } catch (error) {
      throw new Error('Invalid Year value.')
    }
  }

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B" >
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected} />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected} />
      </ContentHeader>
      <Content>
        <WalletBox title={'Saldo'} amount={150.00} footerLabel={'atualizado com base nas entradas e saídas'} icon={'dollar'} color={'#4E41F0'} />
        <WalletBox title={'Entradas'} amount={5000.00} footerLabel={'atualizado com base nas entradas'} icon={'arrowUp'} color={'#F7931B'} />
        <WalletBox title={'Saídas'} amount={4850.00} footerLabel={'atualizado com base nas saídas'} icon={'arrowDown'} color={'#E44C4E'} />
      </Content>
      <MessaBox title={'Muito Bem!'}
        description={'Sua carteira está positiva!'}
        footerText={'Continue assim. Considere investir o seu saldo.'}
        icon={happyImg} />
    </Container>
  )
}

export default Dashboard;