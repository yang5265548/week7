const Navbar = ({isAuthenticated,setIsAuthenticated}) => {
  const handleClick = (e) => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");

  };

  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <a href="/">Home</a>
        {isAuthenticated && <div>
          <a href="/add-job">Add Job</a>
          <p>{JSON.parse(localStorage.getItem("user")).email}</p>
          <button onClick={handleClick}>Logout</button>
          </div>}
        {!isAuthenticated && <div>
          <a href="/signup">Sign Up</a>
          <a href="/login">Login</a>
        </div> }
        
        {/* <a href="/add-job">Add Job</a>
        <a href="/signup">Sign Up</a>
        <a href="/login">Login</a> */}
      </div>
    </nav>
  );
}
 
export default Navbar;