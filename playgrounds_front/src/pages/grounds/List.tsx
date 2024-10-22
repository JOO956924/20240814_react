import {FormEvent, useEffect, useRef, useState} from 'react'
import useToken from '../../hooks/useToken'
import {useNavigate, useSearchParams} from 'react-router-dom'
import './List.css' // 필요한 스타일을 위한 별도 CSS 파일
import Calendar from '../../components/Calendar' // Calendar 컴포넌트를 import

// Grounds 데이터 구조 정의
interface Grounds {
  gno: number
  title: string
  gphotosDTOList: {path: string}[]
  greviewsCnt: number
  nowpeople: number
  maxpeople: number
  price: number
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
  dtoList: Grounds[]
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
  const [query] = useSearchParams()
  const refType = useRef<HTMLSelectElement | null>(null)
  const refKeyword = useRef<HTMLInputElement | null>(null)
  const [pageRequestDTO, setPageRequestDTO] = useState<PageRequestDTO>({
    page: '',
    size: '',
    type: '',
    keyword: ''
  })
  const [pageResultDTO, setPageResultDTO] = useState<PageResultDTO | null>(null)

  const options = [
    {value: '', label: '선택하세요'},
    {value: 't', label: '제목'},
    {value: 'c', label: '내용'},
    {value: 'w', label: '작성자'}
  ]

  useEffect(() => {
    // API 호출 및 데이터 설정 로직
    let url = 'http://localhost:8080/api/grounds/list'
    const queryParams = []
    const page = query.get('page') || '1'
    const type = query.get('type') || ''
    const keyword = query.get('keyword') || ''

    if (type) queryParams.push(`type=${type}`)
    if (page) queryParams.push(`page=${page}`)
    if (keyword) queryParams.push(`keyword=${keyword}`)

    if (queryParams.length > 0) url += '?' + queryParams.join('&')

    if (token) {
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setPageRequestDTO(data.pageRequestDTO)
          setPageResultDTO(data.pageResultDTO)
        })
        .catch(err => console.log('Error:', err))
    }
  }, [query, token])

  const getSearch = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const keyword = refKeyword.current?.value
    const type = refType.current?.value
    navigate(`/grounds/list?type=${type}&keyword=${keyword}&page=1`)
  }

  return (
    <div className="container">
      {/* 현재 시간 달력 */}
      <Calendar />

      {/* 상단 캐러셀 */}
      <div className="carousel">
        <div className="carousel-slide">
          <img src="path_to_your_image" alt="슬라이드 이미지" />
        </div>
        {/* 더 많은 슬라이드를 추가할 수 있음 */}
      </div>

      {/* 검색 폼 */}
      <form className="search-form">
        <select ref={refType} className="search-select">
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          ref={refKeyword}
          className="search-input"
          placeholder="검색어를 입력하세요"
        />
        <button onClick={getSearch} className="search-button">
          검색
        </button>
      </form>

      {/* 카드 리스트 */}
      <div className="card-list">
        {pageResultDTO?.dtoList.map(ground => (
          <div
            key={ground.gno}
            className="card"
            onClick={() => navigate(`/grounds/read?gno=${ground.gno}`)}>
            <img
              src={ground.gphotosDTOList[0]?.path || 'default_image.jpg'}
              alt="Ground"
              className="card-image"
            />
            <div className="card-info">
              <h3>{ground.title}</h3>
              <p>리뷰 수: {ground.greviewsCnt}</p>
              <p>가격: {ground.price}</p>
              <p>등록일: {new Date(ground.regDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
