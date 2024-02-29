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
  const [errorMsg1, setErrorMsg1] = React.useState(' ')
  const [errorMsg2, setErrorMsg2] = React.useState(' ')
  const [errorMsg3, setErrorMsg3] = React.useState(' ')

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

    if (!day) {
      setErrorMsg1('This field is required.')
    }
    if (!month) setErrorMsg2('This field is required.')
    if (!year) setErrorMsg3('This field is required.')

    if (day && month && year) {
      console.log('HOORAY')
      setErrorMsg1('')
      setErrorMsg2('')
      setErrorMsg3('')
    }
    else console.log('FUCKs SAKE')
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
        // required
      >
      </input>
      <p className="error-msg">{errorMsg}</p>
    </div>
  )
}

function DisplayGroup({ day, month, year, onCalc }) {
  const handleCalculation = () => {
    const result = onCalc()
    return result
  }

  const calcResult = handleCalculation()
  
  return (
    <>
      <Display time="Days" value={calcResult.day}/>
      <Display time="Months"value={calcResult.month}/>
      <Display time="Years" value={calcResult.year}/>
    </>
  )
}

function Display({ time, value}) {
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