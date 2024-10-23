import React, {useState, ChangeEvent, FormEvent} from 'react'
import {useNavigate} from 'react-router-dom' // 리디렉션을 위해 react-router-dom 사용

// formData 타입 정의
interface FormData {
  name: string
  email: string
  pw: string
  confirmPw: string
  birth: string
  phone: string
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    pw: '',
    confirmPw: '',
    birth: '',
    phone: ''
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달창 상태 추가
  const navigate = useNavigate() // useNavigate 훅 사용

  // Input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }))
  }

  // Validate form fields
  const validateForm = () => {
    const formErrors: {[key: string]: string} = {}
    const {name, email, pw, confirmPw, birth, phone} = formData

    if (!name) formErrors.name = '이름은 필수 항목입니다.'
    if (!email) formErrors.email = '이메일은 필수 항목입니다.'
    if (!pw) formErrors.pw = '비밀번호는 필수 항목입니다.'
    if (pw !== confirmPw) formErrors.confirmPw = '비밀번호가 일치하지 않습니다.'
    if (!birth || birth.length !== 6)
      formErrors.birth = '생년월일은 6자리 (YYMMDD) 형식이어야 합니다.'
    if (!phone || !/^\d{10,11}$/.test(phone))
      formErrors.phone = '전화번호는 10~11자리 숫자여야 합니다.'

    return formErrors
  }

  // Form submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    const formErrors = validateForm()
    if (Object.keys(formErrors).length === 0) {
      console.log('제출할 데이터 :', formData)
      try {
        const response = await fetch('http://localhost:8080/api/members/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if (response.ok) {
          setErrors({})
          setIsModalOpen(true) // 모달창 열기
        } else if (response.status === 403) {
          setErrors({server: '이메일이 이미 존재하거나 권한이 없습니다.'})
        } else {
          const errorData = await response.json()
          if (errorData.message === '이미 사용 중인 이메일입니다.') {
            setErrors({email: '이미 사용 중인 이메일입니다.'})
          } else {
            setErrors({server: '서버 오류가 발생했습니다.'})
          }
        }
      } catch (error) {
        console.error('Network error:', error)
        setErrors({server: '네트워크 오류가 발생했습니다.'})
      }
    } else {
      setErrors(formErrors)
    }
  }

  // 모달창 닫고 /login 페이지로 이동
  const handleCloseModal = () => {
    setIsModalOpen(false)
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>
          Play Grounds
          <br />
          회원가입
        </h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {['name', 'email', 'pw', 'confirmPw', 'birth', 'phone'].map(field => (
            <div key={field} style={styles.formGroup}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'pw' || field === 'confirmPw' ? 'password' : 'text'}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                style={styles.input}
              />
              {isSubmitted && errors[field] && (
                <p style={styles.error}>{errors[field]}</p>
              )}
            </div>
          ))}

          {isSubmitted && errors.server && <p style={styles.error}>{errors.server}</p>}
          <button type="submit" style={styles.button}>
            회원가입
          </button>
        </form>

        {/* 모달 창 */}
        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2>회원가입 완료</h2>
              <p>Play Grounds 회원이 되신 것을 환영합니다!</p>
              <p>로그인 페이지로 이동합니다.</p>
              <button onClick={handleCloseModal} style={styles.button}>
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4'
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  }
}

export default Signup
