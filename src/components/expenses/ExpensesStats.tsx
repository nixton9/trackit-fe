import React, { useState, useEffect } from 'react'
import { currencyState } from './ExpensesSettings'
import { BarGraph } from '../misc/BarGraph'
import { PieGraph } from '../misc/PieGraph'
import { SelectMenu } from '../misc/SelectMenu'
import { PageLoading } from '../misc/PageLoading'
import { PageError } from '../misc/PageError'
import { Styled } from '../../styles/Page.styles'
import { theme } from '../../styles/theme'
import { ModuleTypes, Expense, ExpenseType } from '../../utils/ModuleTypes'
import { showCurrencySym } from '../../utils/globalHelpers'
import { isSameYear } from '../../utils/dateHelpers'
import { yearsViewOptions } from '../../utils/selectsOptions'
import { ReactComponent as ExpensesIcon } from '../../assets/icons/expenses.svg'
import Tooltip from 'react-tooltip-lite'
import { TouchScrollable } from 'react-scrolllock'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ApolloError } from '@apollo/client'
import { getYear } from 'date-fns'
import {
  getBarChartData,
  getCategoriesData,
  getExpensesPieChartData,
  getTopExpenses
} from '../../utils/statsHelpers'

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

  const barChartData = getBarChartData(data, selectedYear, currency)
  const barChartBars = [{ key: 'value', color: theme.accent }]
  const categoriesData = getCategoriesData(categories, data, selectedYear)
  const topExpenses = getTopExpenses(data, selectedYear)
  const pieChartData = getExpensesPieChartData(
    categories,
    data,
    categoriesData,
    selectedYear,
    currency,
    totalExpensesVal
  )

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
      <div className="page-header-wrapper">
        <Styled.PageTitle>Expenses Stats</Styled.PageTitle>
        <Styled.PageHeader>
          <Styled.PageHeader__View>
            <Styled.PageHeader__View__Dropdown className="expenses">
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
      </div>

      <TouchScrollable>
        <Styled.PageContent className="desktop-grid expenses">
          {error ? (
            <PageError>
              We're sorry but it seems there was a problem reaching the server.
            </PageError>
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
                <BarGraph
                  data={barChartData}
                  bars={barChartBars}
                  type={ModuleTypes.Expenses}
                />
              </Styled.SingleChart>

              <Styled.SingleChart area="pie-chart">
                <Styled.SingleChart__Title>
                  By categories
                </Styled.SingleChart__Title>
                <Styled.SingleChart__Flex>
                  <PieGraph data={pieChartData} type={ModuleTypes.Expenses} />
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
                        <p className="title">{exp.title ? exp.title : '-'}</p>
                        {exp.type && (
                          <p className="category">{exp.type.name}</p>
                        )}
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
      </TouchScrollable>
    </>
  )
}
