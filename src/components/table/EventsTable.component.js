import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table'
import ReactTooltip from 'react-tooltip';
import matchSorter from 'match-sorter'

import {makeColumns} from "./columns.helper";

import { ReactComponent as DownArrow } from '../../icons/down_arrow.svg';
import { ReactComponent as DoubleDownArrow } from '../../icons/double_down_arrow.svg';

import './EventsTable.styles.scss';

// This file uses https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/filtering?from-embed
// as the starting point for a table with filtering

// Define a default UI for filtering
function GlobalFilter({
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search all columns:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={'Search...'}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
        <br/>
        <br/>
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, setFilter },
}) {

  return (
    <input
      className='search-input'
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


// Our table component
function Table({ columns, events: data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: {
        sortBy: [
            {//primary sort
                id: 'active',
                desc: false
            },
            {//secondary sort
                id: 'id',
                desc: false
            }
        ]
    }
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  )

  return (
    <>
    <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
    />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <span>
                    {column.render('Header')}
                    {column.Header === 'Ongoing' && <DownArrow className={'arrow-icon'} data-tip="Primary sort"/>}
                    {column.Header === 'Event ID' && <DoubleDownArrow className={'arrow-icon'} data-tip="Secondary sort"/>}
                  </span>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter && column.Header !== "Toggle ongoing" ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className={`${row?.original?.active ? 'red' : 'green'}`}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}


function EventsTable({events, setEvents}) {
  return (
    <>
      <ReactTooltip />
      <Table columns={makeColumns(events, setEvents)} events={events} />
    </>
  )
}

export default EventsTable;
