import {FormEvent, useEffect, useRef, useState} from 'react'
import useToken from '../../hooks/useToken'
import {useNavigate, useSearchParams} from 'react-router-dom'

// Feed 데이터 구조 정의
interface Feed {
  fno: number
  title: string
  photosDTOList: {path: string}[]
  reviewsCnt: number
  likes: number
  regDate: string
}

// PageRequestDTO 구조 정의
interface PageRequestDTO {
  page: string
  size: string
  type: string
  keyword: string
}

// PageResultDTO 구조 정의
interface PageResultDTO {
  dtoList: Feed[]
  page: number
  start: number
  end: number
  pageList: number[]
  prev: boolean
  next: boolean
}

export default function List() {
  const token = useToken()
  const navigate = useNavigate()

  // 주소의 쿼리를 받기 위한 선언
  const [query] = useSearchParams()

  // 입력양식태그 접근을 위한 선언
  const refType = useRef<HTMLSelectElement | null>(null)
  const refKeyword = useRef<HTMLInputElement | null>(null)
  const refBtnSrch = useRef<HTMLButtonElement | null>(null)

  // 가변 상태를 캐시하기 위한 선언
  const [pageRequestDTO, setPageRequestDTO] = useState<PageRequestDTO>({
    page: '',
    size: '',
    type: '',
    keyword: ''
  })
  const [pageResultDTO, setPageResultDTO] = useState<PageResultDTO | null>(null)
  const [inverted, setInverted] = useState(true)
  const [keywords, setKeywords] = useState('')
  const [types, setTypes] = useState('')

  const options = [
    {value: '', label: '선택하세요'},
    {value: 't', label: '제목'},
    {value: 'c', label: '내용'},
    {value: 'w', label: '작성자'},
    {value: 'tc', label: '제목 + 내용'},
    {value: 'tcw', label: '제목 + 내용 + 작성자'}
  ]

  useEffect(() => {
    // ?? 는 null 병합 연산자, 왼쪽값이 null, undefined일 때 오른쪽 값을 반환
    // null과 undefined을 '==' 하면 true, '===' 하면 false
    let compare = query.get('page') // 기본적으로 페이지 1을 사용
    const page = compare === 'null' || compare == null ? '1' : compare
    compare = query.get('type')
    const type = compare === 'null' || compare == null ? '' : compare
    compare = query.get('keyword')
    const keyword = compare === 'null' || compare == null ? '' : compare

    let url = 'http://localhost:8080/api/feeds/list'
    const queryParams = []

    if (type) {
      setTypes(type)
      setInverted(false)
      queryParams.push(`type=${type}`)
    }
    if (page) queryParams.push(`page=${page}`)
    if (keyword) {
      console.log(keyword + inverted)
      setInverted(false)
      queryParams.push(`keyword=${keyword}`)
    }
    if (queryParams.length > 0) url += '?' + queryParams.join('&')

    if (token) {
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then(data => {
          setPageRequestDTO(data.pageRequestDTO)
          setPageResultDTO(data.pageResultDTO)
        })
        .catch(err => console.log('Error:', err))
    }
  }, [query, types, token]) // 쿼리 파라미터 변경 시 리스트 다시 불러옴

  const url = `/feeds`

  const getSearch = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const keywordw = refKeyword.current?.value
    const typew = refType.current?.value

    if (!keywordw) {
      refKeyword.current?.focus()
      return
    }

    // navigate 호출로 URL만 변경
    navigate(url + `/list?type=${typew}&keyword=${keywordw}&page=1`)
  }

  const goRead = (fno: number, page: number, type: string, keyword: string) => {
    location.href = url + `/read?fno=${fno}&page=${page}&type=${type}&keyword=${keyword}`
  }
  const goRegister = () => {
    location.href =
      url +
      `/register?page=${pageRequestDTO.page}&type=${pageRequestDTO.type}&keyword=${pageRequestDTO.keyword}`
  }

  return (
    <>
      <form method="GET">
        <div className="input-group">
          <div className="input-group-prepend" style={{marginRight: '10px'}}>
            <select
              className="form-control"
              style={{fontSize: '22px'}}
              ref={refType}
              name="type"
              value={types}
              onChange={e => {
                if (e) {
                  setTypes(refType.current?.value ?? '')
                  if (e.target.selectedIndex === 0) {
                    if (!keywords) setKeywords('')
                    setInverted(true)
                    if (refKeyword.current?.value) {
                      setKeywords('')
                    }
                    navigate(`/`)
                  } else if (e.target.value !== types) {
                    console.log('***', e.target.value, types)
                    if (!keywords) {
                      setKeywords('')
                    }
                    setInverted(false)
                    if (refKeyword.current?.value) {
                      setKeywords('')
                    }
                    navigate(`/`)
                    refKeyword.current?.focus()
                  } else {
                    setInverted(false)
                  }
                }
                setTypes(e.target.value)
              }}>
              {options.map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            className="form-control"
            name="keyword"
            style={{borderRadius: '5px', fontSize: '22px'}}
            ref={refKeyword}
            disabled={inverted}
            // readOnly={!inverted}
            onChange={e => {
              console.log(refKeyword.current?.readOnly)
              setKeywords(e.target.value)
            }}
            value={pageRequestDTO.keyword ?? keywords}
          />
          <div className="input-group-append" style={{marginLeft: '10px'}}>
            <button
              type="button"
              style={{fontSize: '30px'}}
              className="btn btn-outline-primary btnSearch"
              onClick={getSearch}
              ref={refBtnSrch}
              disabled={inverted}>
              Search
            </button>
            <button
              onClick={goRegister}
              style={{
                fontSize: '30px',
                marginLeft: '10px',
                background: 'white',
                color: '#bd5d38',
                border: '1px solid #bd5d38'
              }}
              type="button"
              className="btn btn-outline-secondary">
              Register
            </button>
          </div>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Fno</th>
            <th scope="col">Photo & Title</th>
            <th scope="col">Review Count</th>
            <th scope="col">Average Rating</th>
            <th scope="col">RegDate</th>
          </tr>
        </thead>
        <tbody>
          {pageResultDTO?.dtoList.map(feedsDTO => (
            <tr
              key={feedsDTO.fno}
              className="feedlist"
              style={{cursor: 'pointer'}}
              onClick={() =>
                goRead(
                  feedsDTO.fno,
                  pageResultDTO.page,
                  pageRequestDTO.type,
                  pageRequestDTO.keyword
                )
              }>
              <th scope="row">{feedsDTO.fno}</th>
              <td>
                {feedsDTO.photosDTOList.length > 0 &&
                feedsDTO.photosDTOList[0].path != null ? (
                  <img
                    src={`http://localhost:8080/api/display?fileName=${feedsDTO.photosDTOList[0].thumbnailURL}`}
                    style={{display: 'inline-block', marginRight: '20px'}}
                    alt="Feed Thumbnail"
                  />
                ) : (
                  ''
                )}
                {feedsDTO.title}
              </td>
              <td>
                <b>{feedsDTO.reviewsCnt}</b>
              </td>
              <td>
                <b>{feedsDTO.likes}</b>
              </td>
              <td>
                {new Intl.DateTimeFormat('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false // 24시간 형식 사용
                }).format(Date.parse(feedsDTO.regDate))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination h-100 justify-content-center align-items-center">
        {pageResultDTO?.prev && (
          <li className="page-item">
            <a
              className="page-link"
              href={`/feeds/list?page=${Math.max(1, pageResultDTO.start - 1)}`}>
              Prev
            </a>
          </li>
        )}
        {pageResultDTO?.pageList.map(page => (
          <li
            key={page}
            className={`page-item ${pageResultDTO?.page === page ? 'active' : ''}`}>
            <a
              className="page-link"
              href={`/feeds/list?page=${page}&type=${query.get(
                'type'
              )}&keyword=${query.get('keyword')}`}>
              {page}
            </a>
          </li>
        ))}
        {pageResultDTO?.next ? (
          <li className="page-item">
            <a className="page-link" href={`/feeds/list?page=${pageResultDTO.end + 1}`}>
              Next
            </a>
          </li>
        ) : null}
      </ul>
      <div
        className="modal fade"
        id="myModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
