import "./loader.css"

const AppLoader = () => {
  return (
   <div className="loading-overlay">
      <div className="loading-backdrop" />
      <div className="loading-content">
        <div className="brand-container">
          <div className="brand-text">
            <span className="letter letter-1">A</span>
            <span className="letter letter-2">S</span>
            <span className="letter letter-3">S</span>
            <span className="letter letter-4">O</span>
            </div>
            <div className="brand-text">
            <span className="letter space"> </span>
            <span className="letter letter-5">C</span>
            <span className="letter letter-6">O</span>
            <span className="letter letter-7">O</span>
            <span className="letter letter-8">M</span>
          </div>
          <div className="loading-indicator">
            <div className="spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default AppLoader
