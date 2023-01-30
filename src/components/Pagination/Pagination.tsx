import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (pageNumber: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={pageNumber} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (pageNumber: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={pageNumber} className='mx-2 rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderPageNumber = (pageNumber: number) => {
      return (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: pageNumber.toString()
            }).toString()
          }}
          key={pageNumber}
          className={classNames('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
            'border-cyan-500': pageNumber === page,
            'border-transparent': pageNumber !== page
          })}
        >
          {pageNumber}
        </Link>
      )
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (pageNumber <= RANGE || pageNumber > pageSize - RANGE) {
          return renderPageNumber(pageNumber)
        } else if (pageNumber > page - RANGE - 1 && pageNumber < page + RANGE + 1) {
          return renderPageNumber(pageNumber)
        } else if (pageNumber <= page - RANGE - 1) {
          return renderDotBefore(pageNumber)
        } else {
          return renderDotAfter(pageNumber)
        }
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2  shadow-sm'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm'
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2  shadow-sm'>Next</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm'
        >
          Next
        </Link>
      )}
    </div>
  )
}
