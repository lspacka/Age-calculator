function App() {
  const [day, setDay] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState('')
  
  const handleCalculation = () => {
    return { day, month, year} // ?
  }

  return (
    <>
      <InputGroup 
        setDay={setDay}
        setMonth={setMonth}
        setYear={setYear}
        day={day}
        month={month}
        year={year}
      />
      <DisplayGroup 
        day={day}
        month={month}
        year={year}
        onCalc={handleCalculation}
      />
    </>
  )
}

function InputGroup({ day, month, year, setDay, setMonth, setYear }) {
  const [errorMsg1, setErrorMsg1] = React.useState('')
  const [errorMsg2, setErrorMsg2] = React.useState('')
  const [errorMsg3, setErrorMsg3] = React.useState('')

  function isLeapYear(year) {
    return (year%4==0 && year%100!=0) || (year%400==0)
  }

  function InvalidDate(isValid) {
    setErrorMsg1('Invalid Date.')
    setErrorMsg2('')
    setErrorMsg3('')

    return isValid = !isValid
  }

  const handleDayChange = (e) => {
    setDay(e.target.value)
    setErrorMsg1('')
  }

  const handleMonthChange = (e) => {
    setMonth(e.target.value)
    setErrorMsg2('')
  }

  const handleYearChange = (e) => {
    setYear(e.target.value)
    setErrorMsg3('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let current_year = new Date().getFullYear()
    let is_valid = true

    // validate day 
    if (!day) {
      setErrorMsg1('This field is required.')
      is_valid = false
    } else if (isNaN(day) || day < 1 || day > 31) {
      setErrorMsg1('Must be a valid day.')
      is_valid = false
    } else {
      setErrorMsg1('')
    }

    // validate month
    if (!month) {
      setErrorMsg2('This field is required.')
      is_valid = false
    } else if (isNaN(month) || month < 1 || month > 12) {
      setErrorMsg2('Must be a valid month')
      is_valid = false
    } else {
      setErrorMsg2('')
    }

    // validate year
    if (!year) {
      setErrorMsg3('This field is required.')
      is_valid = false
    } else if (isNaN(year) || year.length != 4 || year < 0) {
      setErrorMsg3('Must be a valid year.')
      is_valid = false
    } else if (parseInt(year) > current_year) {
      setErrorMsg3('Must be in the past m8!')
      is_valid = false
    } else {
      setErrorMsg3('')
    }
  
    //  validate date
    if (is_valid) {
      // // check feb and !leap year
      // if (month==2 && !isLeapYear(year) && day>28) InvalidDate(is_valid) 
      // // check feb and leap year
      // if (month==2 && isLeapYear(year) && day>29) InvalidDate(is_valid)
      // check feb and !leap year
      if (month==2) {
        if ((!isLeapYear(year) && day>28) || (isLeapYear(year) && day>29)) {
          InvalidDate(is_valid)
        }
      }

    //   if (month<8) {
    //     if (month%2==0 && month!=2 && day>30) InvalidDate(is_valid)
    //     else if (month%2!=0 && day>31) InvalidDate(is_valid)

    //   }
    //   if (month>=8) {
    //     if (month%2==0 && day>31) InvalidDate(is_valid) 
    //     else if (month%2!=0 && day>30) InvalidDate(is_valid)
    //   }
    // }
    if (month<8) {
      if ((month%2==0 && month!=2 && day>30) || (month%2!=0 && day>31)) InvalidDate(is_valid)
    }
    if (month>=8) {
      if ((month%2==0 && day>31) || (month%2!=0 && day>30)) InvalidDate(is_valid)
    } 
  }

    //  do calc
    if (is_valid) {
      console.log('Valid date entered, performing calculations...')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <Input 
          label="DAY" 
          placeholder="DD" 
          errorMsg={errorMsg1}
          onChange={handleDayChange}
        />
        <Input 
          label="MONTH" 
          placeholder="MM" 
          errorMsg={errorMsg2}  
          onChange={handleMonthChange}
        />
        <Input 
          label="YEAR" 
          placeholder="YYYY" 
          errorMsg={errorMsg3} 
          onChange={handleYearChange}
        />
        <SubmitButton />
      </div>
      <div className="sub-btn-cont">
        {/* <SubmitButton /> */}
      </div>
    </form>
  )
}

function Input({ label, placeholder, errorMsg, onChange }) {
  return (
    <div className="input-box ">
      <label htmlFor={label}>{label}</label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="input" 
        name={label}
        onChange={onChange}
        // autoComplete="off"
      >
      </input>
      <p className="error-msg">{errorMsg}</p>
    </div>
  )
}

function DisplayGroup({ onCalc }) {
  const handleCalculation = () => {
    const result = onCalc()
    return result
  }

  const calcResult = handleCalculation()
  
  return (
    <>
      <Display time="Days" value={calcResult.day}/>
      <Display time="Months" value={calcResult.month}/>
      <Display time="Years" value={calcResult.year}/>
    </>
  )
}

function Display({ time, value}) {
  if (!value) value = '--'

  return <div className="display">{value} {time}</div>
}

function SubmitButton() {
  return (
    <>
      <button type="submit" formNoValidate>
        <img 
          src="assets/images/icon-arrow.svg" 
          className="btn-img">
        </img>
      </button>
    </>
  )
}

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(<App />)