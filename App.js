function App() {
  return (
    <>
      <InputGroup />
      {/* <div>
        <SubmitBtn />
      </div> */}
      <DisplayGroup />
    </>
  )
}

function DisplayGroup() {
  return (
    <>
      <Display />
      <Display />
      <Display />
    </>
  )
}

function Display() {
  return <div className="display">Display</div>
}

function InputGroup() {
  return (
    <form>
      <div className="input-group">
        <Input label="day" />
        <Input label="month" />
        <Input label="year" />
        <SubmitButton />
      </div>
      <div className="sub-btn-cont">
        {/* <SubmitButton /> */}
      </div>
    </form>
  )
}

function Input({ label }) {
  return (
    <div className="input-box ">
      <label htmlFor={label}>{label}</label>
      {/* <p></p> */}
      <input 
        type="text" 
        className="input" 
        name={label}>
      </input>
    </div>
  )
}

function SubmitButton() {
  return (
    <>
      <button type="submit">
        <img src="assets/images/icon-arrow.svg" className="btn-img"></img>
      </button>
    </>
  )
}

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(<App />)