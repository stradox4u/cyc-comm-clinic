import { useNavigate } from 'react-router'
import { Button } from './button'

interface Props {
  currentPage: number
  perPage: number
  total: number
  onPageChange?: (page: number) => void
}

const Pagination = (page: Props) => {
  const navigate = useNavigate()
  const totalPage = Math.ceil(page.total / page.perPage)

  const pagesIndex = []
  for (let i = 1; i <= totalPage; i++) {
    pagesIndex.push(i)
  }

  const handleClick = (nextPage: number) => {
    navigate(`?page=${nextPage}`)
  }

  return (
    <div className="my-10 mx-auto" aria-label="Page navigation">
      {pagesIndex && (
        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() => handleClick(page.currentPage - 1)}
            disabled={page.currentPage === 1}
          >
            Previous
          </Button>

          {pagesIndex.map((pageIndex, index) => (
            <Button
              key={index}
              variant={page.currentPage === pageIndex ? 'default' : 'outline'}
              size={'sm'}
              onClick={() => handleClick(pageIndex)}
            >
              {pageIndex}
            </Button>
          ))}

          <Button
            onClick={() => handleClick(page.currentPage + 1)}
            disabled={page.currentPage === totalPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default Pagination
