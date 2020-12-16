import React, { useState, useEffect } from 'react'
import { currencyState } from './ExpensesSettings'
import { BarGraph } from '../misc/BarGraph'
import { PieGraph } from '../misc/PieGraph'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { Expense, ExpenseType } from '../../utils/ModuleTypes'
import { showCurrencySym, months } from '../../utils/globalHelpers'
import { isSameMonth, isSameYear } from '../../utils/dateHelpers'
import { yearsViewOptions } from '../../utils/selectsOptions'
import { ReactComponent as ExpensesIcon } from '../../assets/icons/expenses.svg'
import Tooltip from 'react-tooltip-lite'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ApolloError } from '@apollo/client'
import { getYear } from 'date-fns'

type ExpensesStatsProps = {
  data: { expenses: Expense[] }
  categories: { types: ExpenseType[] }
  error: ApolloError | undefined
  loading: boolean
}

const CURRYEAR = new Date().getFullYear().toString()

export const ExpensesStats: React.FC<ExpensesStatsProps> = ({
  data,
  categories,
  error,
  loading
}) => {
  const [selectedYear, setSelectedYear] = useState(CURRYEAR)
  const [totalExpensesVal, setTotalExpensesVal] = useState<number | null>(null)

  const currency = useRecoilValue(currencyState)

  const yearsWithData = data
    ? Array.from(
        new Set(
          data.expenses.map(exp => getYear(new Date(exp.date)).toString())
        )
      )
    : []

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedYear(e.target.value)

  const barChartData = data
    ? months
        .map(month => ({
          ...month,
          name: month.name.substring(0, 3),
          monthLabel: `${month.name} ${selectedYear}`,
          value: data.expenses
            .filter(
              exp =>
                isSameMonth(exp.date, month.id) &&
                isSameYear(exp.date, Number(selectedYear))
            )
            .reduce((acc, obj) => acc + obj.value, 0)
        }))
        .map(month => ({
          ...month,
          displayValue: `${month.value}${showCurrencySym(currency)}`
        }))
    : []

  const barChartBars = [{ key: 'value', color: '#7D41FF' }]

  const categoriesData =
    categories && data
      ? data.expenses
          .filter(exp => isSameYear(exp.date, Number(selectedYear)))
          .some(exp => !exp.type)
        ? [
            ...categories.types.filter(cat =>
              data.expenses.some(
                exp =>
                  exp.type &&
                  exp.type.id === cat.id &&
                  isSameYear(exp.date, Number(selectedYear))
              )
            ),
            { id: '0', name: 'Other', color: '#757575' }
          ]
        : [
            ...categories.types.filter(cat =>
              data.expenses.some(
                exp =>
                  exp.type &&
                  exp.type.id === cat.id &&
                  isSameYear(exp.date, Number(selectedYear))
              )
            )
          ]
      : []

  const pieChartData =
    categories && data
      ? categoriesData
          .map(cat => ({
            name: cat.name,
            value:
              cat.id === '0'
                ? data.expenses
                    .filter(
                      exp =>
                        !exp.type && isSameYear(exp.date, Number(selectedYear))
                    )
                    .reduce((acc, obj) => acc + obj.value, 0)
                : data.expenses
                    .filter(
                      exp =>
                        exp.type &&
                        exp.type.id === cat.id &&
                        isSameYear(exp.date, Number(selectedYear))
                    )
                    .reduce((acc, obj) => acc + obj.value, 0),
            color: cat.color
          }))
          .map(cat => ({
            ...cat,
            displayValue: `${cat.value}${showCurrencySym(currency)}`,
            per: totalExpensesVal
              ? ((100 * cat.value) / totalExpensesVal).toFixed(1)
              : 0
          }))
      : []

  const topExpenses = data
    ? [...data.expenses]
        .filter(exp => isSameYear(exp.date, Number(selectedYear)))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
    : []

  useEffect(() => {
    if (data) {
      setTotalExpensesVal(
        data.expenses
          .filter((expense: Expense) =>
            isSameYear(expense.date, Number(selectedYear))
          )
          .reduce((acc, obj) => acc + obj.value, 0)
      )
    }
  }, [data, selectedYear])

  return (
    <>
      <Styled.PageHeader>
        <Styled.PageHeader__View>
          <Styled.PageHeader__View__Dropdown>
            <SelectMenu
              id="year-view"
              value={selectedYear}
              onChange={handleYearChange}
              options={yearsViewOptions(yearsWithData, CURRYEAR)}
              itemClass={'view-select-item'}
            />
          </Styled.PageHeader__View__Dropdown>

          <Tooltip
            content={`Spent on ${selectedYear}`}
            arrow={false}
            direction={'up'}
          >
            <Styled.PageHeader__View__Counter>
              {totalExpensesVal} {currency && showCurrencySym(currency)}
            </Styled.PageHeader__View__Counter>
          </Tooltip>
        </Styled.PageHeader__View>

        <Styled.PageHeader__Settings>
          <Tooltip
            eventOff={'onClick'}
            content={'Expenses'}
            arrow={false}
            direction={'up'}
            className="tooltip"
          >
            <Link to="/expenses" className="mbl-click">
              <ExpensesIcon />
            </Link>
          </Tooltip>
        </Styled.PageHeader__Settings>
      </Styled.PageHeader>

      <Styled.PageContent className="desktop-grid">
        {error ? (
          <PageError>Couldn't get data, check your connection.</PageError>
        ) : loading ? (
          <PageLoading />
        ) : data && data.expenses.length === 0 ? (
          <Styled.SingleChart className="no-data">
            <p>There aren't any expenses to analyse.</p>
          </Styled.SingleChart>
        ) : (
          <>
            <Styled.SingleChart area="bar-chart">
              <Styled.SingleChart__Title>
                Monthly balance
              </Styled.SingleChart__Title>
              <BarGraph data={barChartData} bars={barChartBars} />
            </Styled.SingleChart>

            <Styled.SingleChart area="pie-chart">
              <Styled.SingleChart__Title>
                By categories
              </Styled.SingleChart__Title>
              <Styled.SingleChart__Flex>
                <PieGraph data={pieChartData} />
                <Styled.SingleChart__CategoriesList>
                  {pieChartData.map(cat => (
                    <Styled.SingleChart__Category
                      bgColor={cat.color}
                      key={cat.name}
                    >
                      <div>
                        <p className="name">{cat.name}</p>
                        <p className="percentage">{cat.per}%</p>
                      </div>
                      <p className="value">
                        {cat.value} {showCurrencySym(currency)}
                      </p>
                    </Styled.SingleChart__Category>
                  ))}
                </Styled.SingleChart__CategoriesList>
              </Styled.SingleChart__Flex>
            </Styled.SingleChart>

            <Styled.SingleChart area="list">
              <Styled.SingleChart__Title>
                Top expenses
              </Styled.SingleChart__Title>
              <Styled.SingleChart__TopExpenses>
                {topExpenses.map((exp, i) => (
                  <Styled.SingleChart__Expense
                    key={exp.id}
                    color={exp.type && exp.type.color}
                    position={i + 1}
                  >
                    <div>
                      <p className="title">{exp.title}</p>
                      {exp.type && <p className="category">{exp.type.name}</p>}
                    </div>
                    <p className="value">
                      {exp.value} {showCurrencySym(currency)}
                    </p>
                  </Styled.SingleChart__Expense>
                ))}
              </Styled.SingleChart__TopExpenses>
            </Styled.SingleChart>
          </>
        )}
      </Styled.PageContent>
    </>
  )
}
