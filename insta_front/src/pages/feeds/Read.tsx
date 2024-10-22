import {SyntheticEvent, useCallback, useEffect, useRef, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import useToken from '../../hooks/useToken'
import defaultImg from '../../assets/no-img.gif'

// Feed 데이터 구조 정의
interface FeedsDTO {
  fno: number
  title: string
  photosDTOList: PhotosDTO[]
  reviewsCnt: number
  likes: number
  regDate: string
  modDate: string
}

// PageRequestDTO 구조 정의
interface PageRequestDTO {
  page: string
  size: string
  type: string
  keyword: string
}

// PhotosDTO 구조 정의
interface PhotosDTO {
  uuid: string | Blob
  photosName: string | Blob
  path: string | Blob
}

interface FeedsDTO {
  fno: number
  title: string
  photosDTOList: PhotosDTO[]
  likes: number
  reviewsCnt: number
  regDate: string
  modDate: string
}

export default function Read() {
  const navigate = useNavigate()

  const refTitle = useRef<HTMLInputElement | null>(null)

  const [feedsDTO, setFeedsDTO] = useState<FeedsDTO | null>(null)

  const token = useToken()

  // 주소의 쿼리를 받기 위한 선언
  const [query] = useSearchParams()
  let compare = query.get('page') // 기본적으로 페이지 1을 사용
  const page = compare === 'null' || compare == null ? '1' : compare
  compare = query.get('type')
  const type = compare === 'null' || compare == null ? '' : compare
  compare = query.get('keyword')
  const keyword = compare === 'null' || compare == null ? '' : compare
  compare = query.get('fno')
  const fno = compare === 'null' || compare == null ? '' : compare

  // 가변 상태를 캐시하기 위한 선언
  const [pageRequestDTO, setPageRequestDTO] = useState<PageRequestDTO>({
    page: '',
    size: '',
    type: '',
    keyword: ''
  })

  useEffect(() => {
    let url = 'http://localhost:8080/api/feeds/read/' + fno
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
          setFeedsDTO(data.feedsDTO)
        })
        .catch(err => console.log('Error:', err))
    }
    loadReviewJSON()
  }, [fno, token]) // 쿼리 파라미터 변경 시 리스트 다시 불러옴

  const transDateFormat = useCallback((d: string) => {
    const date = new Date(Date.parse(d ?? ''))
    return (
      [
        date.getFullYear(),
        padTwoDigits(date.getMonth() + 1),
        padTwoDigits(date.getDate())
      ].join('-') +
      ' ' +
      [
        padTwoDigits(date.getHours()),
        padTwoDigits(date.getMinutes()),
        padTwoDigits(date.getSeconds())
      ].join(':')
    )
  }, [])

  function padTwoDigits(num: number) {
    return num.toString().padStart(2, '0')
  }

  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg
  }

  // Ajax로 리뷰 불러오기
  function loadReviewJSON() {
    const url = 'http://localhost:8080/api/reviews/all/'
    const listGroup = document.querySelector('.reviewList')
    fetch(url + fno, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        let str = ''
        for (let i = 0; i < data.length; i++) {
          str =
            str +
            `<div class="card-body form-control mb-1"
        onmouseover="this.style.background='#d6e6ff'"
        onmouseout="this.style.background='white'"
        data-mid="${data[i].mid}" data-text="${data[i].text}"
        data-likes="${data[i].likes}" data-nickname="${data[i].nickname}"
        data-email="${data[i].email}" data-reviewsnum="${data[i].reviewsnum}"
        style="padding: 5px 20px;cursor:pointer;">
          <div style="display:inline-block;width:68%;">
            <h6 style="display:inline-block;width:70px">${data[i].reviewsnum}</h6>
            <h5 class="card-text" style="display:inline-block;">${data[i].text}
            [★ ${data[i].likes}]</h5>
          </div>
          <div style="display:inline-block;width:30%;text-align: right;right-padding:12px;">
            <span class="card-subtitle text-muted" style="font-size:10px">${
              data[i].nickname
            } /
             ${data[i].email}</span>
            <span class="card-subtitle text-muted"
            style="display:inline-block;width:150px;color:rgb(148 163 184);font-size:12px;"
            >${transDateFormat(data[i].regDate)}</span>
          </div>
        </div>`
        }
        listGroup.innerHTML = str
        const cardBody = document.querySelectorAll('.card-body')
        for (let i = 0; i < cardBody.length; i++) {
          // 리뷰 상세보기
          cardBody[i].onclick = function () {
            let reviewsnum = cardBody[i].dataset.reviewsnum
            let text = cardBody[i].dataset.text
            let mid = cardBody[i].dataset.mid
            let likes = cardBody[i].dataset.likes
            let nickname = cardBody[i].dataset.nickname
            document.querySelector('#exampleModalLabel').textContent = 'No ' + reviewsnum
            document.querySelector(
              '.modal-body'
            ).innerHTML = `<input type="hidden" name="reviewsnum" value="${reviewsnum}" readonly>
             <input type="hidden" name="mid" value="${mid}" readonly>
             <label id="notice">Grade</label><span class="star">★★★★★<span>★★★★★</span>
             <input type="range" oninput="drawStar(this)" value="1" step="2" min="0" max="10">
             </span><br>
             <input type="text" class="form-control" name="text" value="${text}">
            `
            document.querySelector(
              '.modal-footer'
            ).innerHTML = `<button type="button" class="btn btn-danger remove">리뷰 삭제</button>
             <button type="button" class="btn btn-warning modify">리뷰 수정</button>
             <span class="btn btn-secondary" data-bs-dismiss="modal">Close</span>
            `
            document.querySelector('.modal-footer .modify').onclick = function () {
              let reviewsnum = document.querySelector(
                ".modal-body input[name='reviewsnum']"
              )
              let text = document.querySelector(".modal-body input[name='text']")
              let mid = document.querySelector(".modal-body input[name='mid']")
              let likes =
                parseFloat(document.querySelector('.star span').style.width) * 0.01 * 5
              let notice = document.querySelector('#notice')

              if (!text.value) {
                text.setAttribute('placeholder', '댓글입력하세요')
                text.focus()
                return
              }
              if (!likes) {
                notice.textContent = 'Select Grade!'
                return
              }
              let reviews = {
                fno: fno,
                text: text.value,
                mid: mid.value,
                likes: likes,
                reviewsnum: reviewsnum.value
              }
              const url = /*[[@{/reviews/}]]*/ 'url'
              fetch(url + fno + '/' + reviewsnum.value, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(reviews)
              })
                .then(res => res.json())
                .then(function (data) {
                  document.querySelector('#exampleModalLabel').innerHTML = `수정 알림`
                  document.querySelector(
                    '.modal-body'
                  ).innerHTML = `${data}번 댓글 수정 완료.`
                  document.querySelector('.modal-footer .modify').style.display = 'none'
                  document.querySelector('.modal-footer .remove').style.display = 'none'
                  loadReviewJSON()
                })
                .catch(err => console.log('myError', err))
            }
            document.querySelector('.modal-footer .remove').onclick = function () {
              let reviewsnum = document.querySelector(
                ".modal-body input[name='reviewsnum']"
              )
              const url = 'http://localhost:8080/api/reviews/'
              fetch(url + fno + '/' + reviewsnum.value, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json'}
              })
                .then(res => res.json())
                .then(async function (data) {
                  document.querySelector('#exampleModalLabel').innerHTML = `삭제 알림`
                  document.querySelector(
                    '.modal-body'
                  ).innerHTML = `${data}번 댓글 삭제 완료.`
                  document.querySelector('.modal-footer .modify').style.display = 'none'
                  document.querySelector('.modal-footer .remove').style.display = 'none'
                  document.querySelector('#revCnt').textContent =
                    parseInt(document.querySelector('#revCnt').textContent) - 1
                  loadReviewJSON()
                })
                .catch(err => console.log('myError', err))
            }
            document.querySelector('.star span').style.width = `${likes * 20}%`
            myModal.show()
          }
        }
      })
  }
  return (
    <>
      <h2 className="mt-4">Feed Modify Page</h2>
      <form action="/feeds/modify" method="post" id="frmSend">
        <div className="form-group">
          <label>Fno</label>
          <input
            type="text"
            value={feedsDTO?.fno || ''}
            name="fno"
            className="form-control"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={feedsDTO?.title || ''}
            className="form-control"
            readOnly
          />
        </div>
        <div style={{marginBottom: '30px'}}>
          <label>Review Count</label>
          <input
            type="text"
            name="reviewsCnt"
            className="form-control"
            readOnly
            value={feedsDTO?.reviewsCnt ?? 0}
          />
        </div>
        <div style={{marginBottom: '30px'}}>
          <label>Average</label>
          <input
            type="text"
            name="likes"
            readOnly
            className="form-control"
            value={feedsDTO?.likes ?? 0}
          />
        </div>
        <div className="form-group">
          <label>RegDate</label>
          <input
            type="text"
            className="form-control"
            value={transDateFormat(feedsDTO?.regDate ?? '')}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>ModDate</label>
          <input
            type="text"
            className="form-control"
            value={transDateFormat(feedsDTO?.modDate ?? '')}
            readOnly
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="fileInput">Select Image Files</label>
          <input
            type="file"
            id="fileInput"
            className="custom-file-input form-control files"
            multiple></input>
          <label id="custom-label"></label>
        </div> 
        <div className="box"></div>*/}
        <div className="form-group">
          <input type="hidden" name="page" value={page} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="keyword" value={keyword} />
          <button className="btn btn-primary btnModi">Modify</button>
          <button className="btn btn-info btnBack">Back</button>
        </div>
      </form>
      <div className="uploadResult">
        <ul>
          {feedsDTO?.photosDTOList.map((photosDTO, idx) => (
            <li
              key={idx}
              data-file="${photosDTO.getThumbnailURL}"
              style={{cursor: 'pointer'}}>
              {photosDTO.path == null ? (
                <img
                  key={idx}
                  src={defaultImg}
                  style={{display: 'inline-block', marginRight: '20px'}}
                  alt="Feed Thumbnail"
                />
              ) : (
                <img
                  key={idx}
                  src={`http://localhost:8080/api/display?fileName=${photosDTO.thumbnailURL}`}
                  style={{display: 'inline-block', marginRight: '20px'}}
                  alt="Feed Thumbnail"
                  onError={addDefaultImg}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="list-group reviewList" style={{marginBottom: '50px'}}></div>
      <div
        className="modal fade"
        id="myModal"
        tabIndex="-1"
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
